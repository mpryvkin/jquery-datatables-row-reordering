[Index](Index.md) > Setup

# Introduction #

In this section you can find detailed instructions for setting-up row reordering plugin.

# Details #


## HTML Table structure ##

HTML table Add your content here.  Format your content with:
  * Table must be properly formatted according to the DataTables requirements e.g. it must have THEAD, TBODY and optionally TFOOT sections
  * Each TR element must have id attribute.
  * One column in the table should be **indexing** column. This column will be used for determining position of the row in the table. By default this is first column in the table. You can see structure of the table on the [live example page](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/default.html).

## Initialize Row Reordering ##

If table with id "example" is placed in the HTML of the page, you will need to apply DataTables plugin to the table, and then you will need to apply rowReordering() plugin. Example of the initialization call is shown in the following listing:

```
    $('#example').dataTable()
                 .rowReordering();
```

Once you run this code in the HTML you will be able to reorder rows using Drag'n'Drop. Each time you drag row and put it to new position order of rows will be updated and indexes in the position column will be updated - you can how it works on the [live example page](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/default.html).

## Consequences ##

There are few constraints in this plugin:
  * Rows can be ordered only by **indexing** column. This plugin  will force ascending sorting by indexing column.
  * Sorting by columns will be disabled. If you shuffle rows in some order other than indexing column order there will be no way to determine to what position row is dropped.


Next: [Server Side Integration](ServerSideIntegration.md)