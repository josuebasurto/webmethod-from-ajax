

$("#grid").kendoGrid({
    dataSource: [
        { id: 1, nombre: "Josue", status: "Disponible", fecha: new Date("2011/12/29 10:45") },
        { id: 2, nombre: "Carito", status: "No Disponible", fecha: new Date("2014/12/29 12:45") }
    ],
    columns: [
        { field: "id", title: "#" },
        { field: "nombre", title: "Nombre" },
        { field: "status", title: "Status" },
        { field: "fecha", title: "Fecha", format: "{0:yyyy-MM-dd}", editor: dateTimeEditor, editable:true },
        { field: "fecha", title: "Hora", format: "{0:HH:mm}", editor: timeEditor, editable: true }

    ],
    editable: "incell"
});

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