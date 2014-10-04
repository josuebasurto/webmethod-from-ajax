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
        { field: "fecha", title: "Hora", format: "{0:HH:mm}", editor: timeEditor, editable: true },
        { template: '<input text="accion" type="button" onClick="javascript:showDetails(\'#: nombre #\',\'#: status #\',\'#: id #\')" value="Accion"></input>' }

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
    slog("id: " + id + " nom: " + nom + " stat: " + stat);



    try {
        $.ajax({
            type: "POST",
            url: "Default.aspx/postMetodo",
            data: "{'parametros' : '" + id + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: OnSuccess,
            error: OnFail

        }).done(function () {
            slog("Done!");
        });
    }
    catch (err) {
        slog("Excepcion: " + err.message);
    }

}

function OnSuccess(response) {
    slog("Exito: " + response.d);
    
}

function OnFail(response) {
    slog("Fracaso: " + response.d);
}

function slog(text){
    $('#result').prepend(text + '<br />');
}