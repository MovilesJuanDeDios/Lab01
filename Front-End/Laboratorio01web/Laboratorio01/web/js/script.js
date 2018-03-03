/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {    
    //agrega los eventos las capas necesarias
    $("#agregar").click(function() { 
        agregarProducto();
    });
    
    //eventos para la busqueda
    $("#buscarPorNombre").click(function() {
        var nom = ($("#buscarNombre").val()).trim();
        if (nom !== "") {
            consultarPorNombre(nom);
        }
    });
});


$(document).ready(function() {
    consultarProductos();
});

function consultarProductos() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la informacion en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: "ProductoServlet",
        data: {
            accion: "consultarProductos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            mostrarMensaje("alert alert-danger", "Se genero un error (Error del ajax)", "Error!");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
            ocultarModal("myModal");
        },
        dataType: "json",  
        type: 'POST'
    });
}

function consultarPorNombre(nombre) {
    //Se envia la información por ajax
    $.ajax({
        url: 'ProductoServlet',
        data: {
            accion: "consultarPorNombre",
            nombre: nombre
        },
        error: function() { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la informacion en la base de datos"); 
        },
        success: function(data) {
            if (data.length === 0) {
                mostrarModal("myModal", "Busqueda Compleada", "No se encontraron coincidencias");
                setTimeout(function() { ocultarModal("myModal"); }, 1000);  
            } else {
                dibujarTabla(data);
                ocultarModal("myModal");
            }
        },
        dataType: "json",
        type: 'POST'
    });
}

function agregarProducto() {
    //Se envia la información por ajax
    var importado;
    if ($("#importado").is(':checked'))
        importado = 1;
    else 
        importado = 0; 
    $.ajax({
        url: 'ProductoServlet',
        data: {
            accion: "agregar",
            codigo: $("#codigo").val(),
            nombre: $("#nombre").val(),
            precio: $("#precio").val(),
            importado: importado,
            tipo: $("#tipo").val()
        },
        error: function() {
            mostrarMensaje("alert alert-danger", "Se genero un error (Error del ajax)");
            },
        success: 
            function(data) { 
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
            
                    consultarProductos();
              
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error", "Error!");
                    }
                }
            },
        type: 'POST'
    });
}
     
 
function dibujarTabla(data) {
    $("#tablaProductos tbody").html("");
    data.forEach(dibujarFila);
}


function dibujarFila(rowData) {
   /*
    var s;
    if (rowData.importado === 1)
        s = "<input type=" + '"checkbox"' + " checked" + " readonly>";
    else
        s = "<input type=" + "'checkbox'" + " readonly>";
        */
    
    var row = $("<tr />");
    $("#tablaProductos tbody").append(row); 
    row.append($("<td>" + rowData.nombreProducto + "</td>"));
    row.append($("<td>" + rowData.importado + "</td>"));
    row.append($("<td>" + rowData.precio + "</td>"));
    row.append($("<td>" + rowData.tipo + "</td>"));

    switch(rowData.tipo) {
        case"Canasta":
            row.append($("<td>" + 5 + "</td>"));
            break;
        case"Popular":
            row.append($("<td>" + 13 + "</td>"));
            break;
        case"Suntuario":
            row.append($("<td>" + 15 + "</td>"));
            break;
    }
    
   
}

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mesajeResult").removeClass();

    //se setean los estilos
    $("#mesajeResult").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mesajeResult").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}
/*
function limpiarForm() {
    //setea el focus del formulario
    $('#titulo').focus();
    $("#titulo").removeAttr("readonly");
    
    $("#groupTitulo").removeClass("has-error");
    $("#groupGenero").removeClass("has-error");
    $("#groupCalificacion").removeClass("has-error");
    
    //se cambia la accion por agregarAnime
    $("#animeAction").val("agregarAnime"); 

    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formAnime').trigger("reset");
}
*/

/*
function metodosCalculo() {
    //Se envia la información por ajax
    var percent, imp, tot;
    $.ajax({
        url: "ProductoServlet",
        data: {
            accion: "calc"
        },
        type: 'get',
        dataType: "json"
    }).done(function (data) {
        if (data.length > 0)
            dibujarTabla(data);
    });
}
*/