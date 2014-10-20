

$("#grid").kendoGrid({
    dataSource: [
        // { id: 1, nombre: "Josue", status: "Disponible", fecha: new Date("2011/12/29 10:45") },
        // { id: 2, nombre: "Carito", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 3, nombre: "sara", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 4, nombre: "Jose", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 5, nombre: "irma", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 6, nombre: "vero", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 7, nombre: "gaby", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 8, nombre: "lalo", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 9, nombre: "marco", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 10, nombre: "juan", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 11, nombre: "pedro", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 12, nombre: "doki", status: "No Disponible", fecha: new Date("2014/12/29 12:45") },
        // { id: 13, nombre: "tasha", status: "No Disponible", fecha: new Date("2014/12/29 12:45") }

        { id: 1, nombre: "Josue", status: "Disponible", inventario: 10 },
        { id: 2, nombre: "Carito", status: "No Disponible", inventario: 10},
        { id: 3, nombre: "sara", status: "No Disponible", inventario: 25},
        { id: 4, nombre: "Jose", status: "No Disponible", inventario: 10 },
        { id: 5, nombre: "irma", status: "No Disponible", inventario: 30 },
        { id: 6, nombre: "vero", status: "No Disponible", inventario: 10 },
        { id: 7, nombre: "gaby", status: "No Disponible", inventario: 25},
        { id: 8, nombre: "lalo", status: "No Disponible", inventario: 10},
        { id: 9, nombre: "marco", status: "No Disponible", inventario: 15},
        { id: 10, nombre: "juan", status: "No Disponible", inventario: 10},
        { id: 11, nombre: "pedro", status: "No Disponible", inventario: 20},
        { id: 12, nombre: "doki", status: "No Disponible", inventario: 10},
        { id: 13, nombre: "tasha", status: "No Disponible", inventario: 40} 
    ],
    columns: [
        { field: "id", title: "#", editable : false },
        { field: "nombre", title: "Nombre", editable : false, filterable:true},
        { field: "inventario", title: "inventario", editable : false },
        { field: "entero",  type: "number", validation: { required: true, min: 1}},
        
       //{ field: "fecha", title: "Fecha", format: "{0:yyyy-MM-dd}", editor: dateTimeEditor, editable:true },
        //{ field: "fecha", title: "Hora", format: "{0:HH:mm}", editor: timeEditor, editable: true },
        { field:"input1", template: '<input id="accion_#= id #" text="accion" type="text" value="Accion"></input>' },
        { template: '<input type="checkbox" id="checkbox_#= id #"></input>' }
        //UnitPrice: { type: "number", validation: { required: true, min: 1} }
    ],
    editable: "incell",
    groupable: true,
    sortable: true,
    //Paging
    pageSize: 5,
    pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
    }

});


function pruebasGrid(){
    alert('ok');
    var mikgrid = $('#grid').data("kendoGrid")._data[0];

    //Recuerda tener acceso los controles con el ID
    // checkbox_#= id #
    // accion_#= id #

    alert(mikgrid.input1);
    var x =0;
}

function dateTimeEditor(container, options) {
    $('<input data-text-field="' + options.field + '" ' +
        'data-value-field="' + options.field + '" ' +
        'data-bind="value:' + options.field + '" ' +
        'data-format="' + options.format + '" />')
    .appendTo(container)
    .kendoDatePicker({});
}

function timeEditor(container, options) {
    $('<input data-text-field="' + options.field + '" ' +
        'data-value-field="' + options.field + '" ' +
        'data-bind="value:' + options.field + '" ' +
        'data-format="' + options.format + '" />')
    .appendTo(container)
    .kendoTimePicker({});
}

function showDetails(nom, stat, id) {
    slog("ShowDetails params <br /> id: " + id + " nom: " + nom + " stat: " + stat);

    //We create an object that can have multiple parameters
    var parametros = {
        param0: id,
        param1: nom
    };

    //We try to make an ajax request.
    try {
        $.ajax({
            type: "POST", //HTTP Method
            url: "Default.aspx/postMetodo", //File + WebMethod.
            data: JSON.stringify(parametros), //We give format to parameters to avoid attacks
            dataType: "json", //Type of data
            contentType: "application/json; charset=utf-8", //sent content type
            success: OnSuccess, //Success function
            error: OnFail //Fail function
        }).done(function () {
            slog("Done!"); //Every time it runs
        });
    }
    catch (err) {
        slog("Exception: " + err.message);
    }

    slog("<hr />");
}

function OnSuccess(response) {
    slog("Success event: " + response.d);
    
}

function OnFail(response) {
    slog("Fail Event: " + response.d);
}

function slog(text){
    $('#result').prepend(text + '<br />');
}


//Function de exportacion de excel
function exportaExcel() {
    var viewModel = kendo.observable({

        saveGridCsv: function () {
            viewModel.exportCsv('grid', 'testdata.csv');
        },
        exportCsv: function (idgrid, fileName) {
            var grid = $("#" + idgrid).data("kendoGrid");
            // var originalPageSize = grid.dataSource.pageSize();
            var originalPageSize = 5;
            var csv = '';
            fileName = fileName || 'download.csv';

                // Increase page size to cover all the data and get a reference to that data
                grid.dataSource.pageSize(grid.dataSource.view().length);
                var data = grid.dataSource.view();

                //add the header row
                for (var i = 0; i < grid.columns.length; i++) {
                    var field = grid.columns[i].field;
                    var title = grid.columns[i].title || field;

                    //NO DATA
                    if (!field) continue;

                    title = title.replace(/"/g, '""');
                    csv += '"' + title + '"';
                    if (i < grid.columns.length - 1) {
                        csv += ',';
                    }
                }
                csv += '\n';

                //add each row of data
                for (var row in data) {
                    for (var i = 0; i < grid.columns.length; i++) {
                        var fieldName = grid.columns[i].field;
                        var template = grid.columns[i].template;
                        var exportFormat = grid.columns[i].exportFormat;

                        //VALIDATE COLUMN
                        if (!fieldName) continue;
                        var value = '';
                        if (fieldName.indexOf('.') >= 0){
                            var properties = fieldName.split('.');
                            var value = data[row] || '';
                            for (var j = 0; j < properties.length; j++) {
                                var prop = properties[j];
                                value = value[prop] || '';
                            }
                        }
                        else{
                            value = data[row][fieldName] || '';
                        }

                        if (value && template && exportFormat !== false) {
                            value = _.isFunction(template)
                            ? template(data[row])
                            : kendo.template(template)(data[row]);
                        }

                        value = value.toString().replace(/"/g, '""');
                        csv += '"' + value + '"';
                        if (i < grid.columns.length - 1) {
                            csv += ',';
                        }
                    }
                    csv += '\n';
                }

                // Reset datasource
                grid.dataSource.pageSize(originalPageSize);

                //EXPORT TO BROWSER
                var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); //Blob.js
                saveAs(blob, fileName); //FileSaver.js
            }
        });
    // Kendo MVVM binding    
    kendo.bind('body', viewModel);

}

function readValue_onClick(){
    alert('Exportemos...');
    exportaExcel();
}