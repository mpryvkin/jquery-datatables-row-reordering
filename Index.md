# Introduction #
Row Reordering plugin is an additional add-on for DataTables plugin that enables users to reorder rows int the table using simple Drag'n'Drop.

## Details ##

DataTables plugin adds lot of common functionalities to the simple HTML tables. This plugin enhances table by adding JavaScript functionalities for filtering, sorting, pagination. Initialization is simple and just one JavaScript call is needed:
```
    $('#example').dataTable();
```

There are lot of other functionalities such as column reordering, column hiding, etc, but reordering rows using Drag'n'Drop is not standard feature.
This plugin adds this feature to DataTables - you just need to add one additional function call:

```
    $('#example').dataTable()
		 .rowReordering();
```

This call will add following features to DataTable:
  * Enable user to Drag'n'Drop rows
  * Notify server-side page that order is changed

## Documentation and examples ##

You can find more details about the usage of plugin on the following pages:
  * [Setup](RowReordering.md) - implementing row reordering features in table
  * [Server Side Integration](ServerSideIntegration.md) - integration of plugin with server-side page that can update order of records in some persistent storage.
  * [Reordering grouped rows](RowGrouping.md) - example of integration with row grouping plugin.

Also, you can find few examples on the following live demo pages:
  * [Default usage](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/default.html)
  * [Server side integration](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/notify.html)
  * [Handling server-side errors during reordering](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/error.html)
  * [Reordering grouped rows](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/rowGrouping.html)

## Dependencies ##

DataTables Row Reordering plugin requires following JavaScript libraries:
  * JQuery
  * JQuery UI (only sortable is required)
  * JQuery DataTables plugin (tested with version 1.9)