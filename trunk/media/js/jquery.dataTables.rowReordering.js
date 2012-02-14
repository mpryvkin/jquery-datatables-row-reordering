/*
* File:        jquery.dataTables.rowReordering.js
* Version:     1.0.0.
* Author:      Jovan Popovic 
* 
* Copyright 2012 Jovan Popovic, all rights reserved.
*
* This source file is free software, under either the GPL v2 license or a
* BSD style license, as supplied with this software.
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. 
* 
* Parameters:
* @iIndexColumn     int         Position of the indexing column
* @sURL             String      Server side page tat will be notified that order is changed
* @sGroupingUsed    Boolean     Defines that grouping is used
*/
(function ($) {

    $.fn.rowReordering = function (options) {
		
        function fnRefreshRowPositions(sSelector, from, to, id) {
		
			var oSettings = oTable.fnSettings();
			
            $(sSelector, oTable).each(function (index) {

                oTable.fnUpdate(oSettings._iDisplayStart + index + properties.iStartPosition, 
								oTable.fnGetPosition(this), // get row position in current model
								properties.iIndexColumn,
								false); // false = defer redraw until all row updates are done

            });
			
            oTable.fnDraw();
			
        }

        function _fnAlert(message, type) { alert(message); }

        var oTable = this;

        var defaults = {
            iIndexColumn: 0,
            iStartPosition: 1,
            sURL: null,
            sRequestType: "POST",
            sGroupingUsed: false,
            fnAlert: _fnAlert
        };

        var properties = $.extend(defaults, options);
		
		var iFrom, iTo;

        return this.each(function () {

		    var aaSortingFixed = (oTable.fnSettings().aaSortingFixed==null?new Array():oTable.fnSettings().aaSortingFixed);
            aaSortingFixed.push([properties.iIndexColumn, "asc"]);

            oTable.fnSettings().aaSortingFixed = aaSortingFixed;

			for(var i=0; i<oTable.fnSettings().aoColumns.length; i++)
			{
				oTable.fnSettings().aoColumns[i].bSortable = false;
				/*for(var j=0; j<aaSortingFixed.length; j++)
				{
					if( i == aaSortingFixed[j][0] )
						oTable.fnSettings().aoColumns[i].bSortable = false;
				}*/
			}
			
            $("tbody", oTable).sortable({
                cursor: "move",
                update: function (event, ui) {
                    var tbody = $(this);
                    var sSelector = "tbody tr";
                    if (properties.bGroupingUsed) {
                        var group = $(ui.item).attr("data-group");
                        sSelector = "tbody tr[data-group='" + group + "']";
                    }

                    $(sSelector, oTable).each(function (index) {
                        if (ui.item.context.id == this.id) {
                            iFrom = oTable.fnGetData(this, properties.iIndexColumn);
                            iTo = index + 1;
                            var tr = this;

                            if (properties.sURL != null) {
                                $.ajax({
                                    url: properties.sURL,
                                    type: properties.sRequestType,
                                    data: { id: ui.item.context.id,
                                            fromPosition: iFrom,
                                            toPosition: iTo
                                    },
                                    success: function () {
                                        fnRefreshRowPositions(sSelector, iFrom, iTo, ui.item.context.id);
                                    },
                                    error: function () {
                                        tbody.sortable('cancel');
                                        properties.fnAlert("Order canot be changed on the server-side");
                                    }
                                });
                            }
                        }
                    });

                    if (properties.sURL == null) {
                        fnRefreshRowPositions(sSelector, iFrom, iTo, ui.item.context.id);
                    }

                }
            });

        });

    };




})(jQuery);