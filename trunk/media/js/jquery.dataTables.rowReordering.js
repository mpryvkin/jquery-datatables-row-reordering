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
            $(sSelector, oTable).each(function (index) {
                var pos = oTable.fnGetPosition(this); // get row position in current model
                if (properties.iIndexColumn > -1)
                    oTable.fnUpdate(index + properties.iStartPosition, pos, properties.iIndexColumn, false); // false = defer redraw until all row updates are done
                else
                    $(this).attr("data-position", index);

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

        return this.each(function () {

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
                            var from = oTable.fnGetData(this, properties.iIndexColumn);
                            var to = index + 1;
                            var tr = this;

                            if (properties.sURL != null) {
                                $.ajax({
                                    url: properties.sURL,
                                    type: properties.sRequestType,
                                    data: { id: ui.item.context.id,
                                            fromPosition: from,
                                            toPosition: to
                                    },
                                    success: function () {
                                        fnRefreshRowPositions(sSelector, from, to, ui.item.context.id);
                                    },
                                    error: function () {
                                        tbody.sortable('cancel');
                                        properties.fnAlert("Order canot be changed on the server-side");
                                    }
                                });
                            }
                        }
                        /*

                        var pos = oTable.fnGetPosition(this); // get row position in current model
                        if (properties.iIndexColumn > -1)
                        oTable.fnUpdate(index + properties.iStartPosition, pos, properties.iIndexColumn, false); // false = defer redraw until all row updates are done
                        else
                        $(this).attr("data-position", index);
                        */

                    });
                    //oTable.fnDraw();
                    if (properties.sURL == null) {
                        fnRefreshRowPositions(sSelector, 0, 0, ui.item.context.id);
                    }

                }
            });

        });

    };




})(jQuery);