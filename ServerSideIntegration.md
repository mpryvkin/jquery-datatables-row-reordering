[Index](Index.md) > Server-side Integration
# Integrate plugin with server-side page #

Row Reordering plugin can be configured to notify server-side page page that order of rows is changed.

## Configuring Server-side page ##

Server side page where information of changed position will be sent is passed to the plugin as sURL parameter. Example of call is shown in the following example:
```
      $('#example').dataTable()
                   .rowReordering({ 
                                     sURL:"UpdateRowOrder.php",
                                     sRequestType: "GET"
                                   });
```
You can also, set HTTP protocol that will be used to call server-side page in the sRequestType parameter (default is "POST"). You can see live example on the
[live demo page](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/notify.html).

## Request Parameters ##

When Ajax request is sent to the server-side page following parameters are sent:
  * id - id of the row that is moved. This information is set in the id attribute of the TR element.
  * fromPosition - initial position of the row that is moved. This was value in the indexing cell of the row that is moved.
  * toPosition - new position where row is dropped. This value will be placed in the indexing column of the row.

If no errors are returned from the server-side, positions will be updated in the indexing columns in the table.

## Handling errors ##

If server-side page returns any error, plugin will show error message and revert old order of rows. Optionally, if you do not want to use default alert you can setup function that will be used to show error message - example is shown in the following code:

```
  $('#example').dataTable()
               .rowReordering({ 
                              sURL:"UpdateRowOrder.php",
                              fnAlert: function(message) { 
                                              alert(message);
                                       }
                               });
```

You can see live example on the
[live demo page](http://jquery-datatables-row-reordering.googlecode.com/svn/trunk/error.html).

Previous: [Setup](RowReordering.md) Next: [Reordering grouped rows](RowGrouping.md)