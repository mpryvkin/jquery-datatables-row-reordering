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
	
		function _fnStartProcessingMode() {
            ///<summary>
            ///Function that starts "Processing" mode i.e. shows "Processing..." dialog while some action is executing(Default function)
            ///</summary>

            if (oTable.fnSettings().oFeatures.bProcessing) {
                $(".dataTables_processing").css('visibility', 'visible');
            }
        }

        function _fnEndProcessingMode() {
            ///<summary>
            ///Function that ends the "Processing" mode and returns the table in the normal state(Default function)
            ///</summary>

            if (oTable.fnSettings().oFeatures.bProcessing) {
                $(".dataTables_processing").css('visibility', 'hidden');
            }
        }
		
		function fnGetStartPosition(sSelector) {
			var iStart = 100000000000000;
			$(sSelector, oTable).each(function () {
				iPosition =  parseInt( oTable.fnGetData(this, properties.iIndexColumn) );
				if(iPosition < iStart)
					iStart = iPosition; 
			});
			return iStart;
		}
        function fnRefreshRowPositions(sSelector, from, to, id) {
		
			var oSettings = oTable.fnSettings();
			
            $(sSelector, oTable).each(function (index) {

                //oTable.fnUpdate(oSettings._iDisplayStart + index + properties.iStartPosition, 
				oTable.fnUpdate(fnGetStartPosition(sSelector) + index,
								oTable.fnGetPosition(this), // get row position in current model
								properties.iIndexColumn,
								false); // false = defer redraw until all row updates are done

            });
			
            //oTable.fnDraw();
			
			//Standing Redraw Extension
			//Author: 	Jonathan Hoguet
			//http://datatables.net/plug-ins/api#fnStandingRedraw
			if(oSettings.oFeatures.bServerSide === false){
					var before = oSettings._iDisplayStart;
					oSettings.oApi._fnReDraw(oSettings);
					//iDisplayStart has been reset to zero - so lets change it back
					oSettings._iDisplayStart = before;
					oSettings.oApi._fnCalculateEnd(oSettings);
			}
			//draw the 'current' page
			oSettings.oApi._fnDraw(oSettings);
			
        }

        function _fnAlert(message, type) { alert(message); }

        var oTable = this;

        var defaults = {
            iIndexColumn: 0,
            iStartPosition: 1,
            sURL: null,
            sRequestType: "POST",
            sGroupingUsed: false,
            fnAlert: _fnAlert,
			sDataGroupAttribute: "data-group",
			fnStartProcessingMode:_fnStartProcessingMode,
			fnEndProcessingMode: _fnEndProcessingMode
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
			oTable.fnDraw();
			
            $("tbody", oTable).sortable({
                cursor: "move",
                update: function (event, ui) {
                    var tbody = $(this);
                    var sSelector = "tbody tr";
					var sGroup = "";
                    if (properties.bGroupingUsed) {
                        sGroup = $(ui.item).attr(properties.sDataGroupAttribute);
                        sSelector = "tbody tr[" + properties.sDataGroupAttribute + " ='" + sGroup + "']";
                    }

                    $(sSelector, oTable).each(function (index) {
						var oSettings = oTable.fnSettings();
						
                        if (ui.item.context.id == this.id) {
                            iFrom = oTable.fnGetData(this, properties.iIndexColumn);
                            iTo =  fnGetStartPosition(sSelector) + index;
							
                            var tr = this;

                            if (properties.sURL != null) {
								properties.fnStartProcessingMode();
                                $.ajax({
                                    url: properties.sURL,
                                    type: properties.sRequestType,
                                    data: { id: ui.item.context.id,
                                            fromPosition: iFrom,
                                            toPosition: iTo,
											group: sGroup
                                    },
                                    success: function () {
                                        fnRefreshRowPositions(sSelector, iFrom, iTo, ui.item.context.id);
										properties.fnEndProcessingMode();
                                    },
                                    error: function (jqXHR) {
                                        tbody.sortable('cancel');
										properties.fnEndProcessingMode();
                                        properties.fnAlert(jqXHR.statusText);
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