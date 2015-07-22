[Index](Index.md) > Row Grouping
# Integrate plugin with row grouping plugin #

Row Reordering plugin can be use with rows that are grouped together. The easiest way to implement grouping is to use [DataTables Row Grouping Plugin](http://jquery-datatables-row-grouping.googlecode.com/svn/trunk/index.html), which groups rows in the table.

## Table structure ##

When you reorder grouped rows you will need to have two important columns:
  * Column that will be used for grouping. This column will be hidden by row grouping plugin and added as a heading row for the group.
  * Indexing column that will contain indexes within the group. Note that within each group, indexes should start from 1.

## Integrate plugin with row grouping plugin ##

To enable reordering of grouped rows you will need to apply both rowGrouping and rowReordering plugins on table. Example is shown in the following code:

```
$('#example').dataTable()
             .rowGrouping({   iGroupingColumnIndex: 1 })
             .rowReordering({ 
                              bGroupingUsed: true,
                              iIndexColumn: 0
                            });
```

In the row grouping plugin you will need to define what column will be used for grouping (column 1 in the example above). Also, in the row reordering plugin you will need to define that grouping is used and in which column are placed positions(indexes within the group).
Plugin will enable user to drag and drop rows and it will update indexes only within the current group.

Row reordering plugin will not allow you to move rows between groups because it will involve changing information about the group and indexing information. If you want to move rows to other groups you will need to edit it, change group manually, and then change position with row reordering plugin.

You can see live example on the
[live demo page](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/rowGrouping.html).

Previous: [Server Side Integration](ServerSideIntegration.md)