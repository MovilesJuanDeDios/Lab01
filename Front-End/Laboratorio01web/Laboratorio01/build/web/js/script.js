/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {    
    //agrega los eventos las capas necesarias
    $("#agregar").click(() => agregarProducto());
    
    //eventos para la busqueda
    $("#buscarPorNombre").click(() => {
        var nom = ($("#buscarNombre").val()).trim();
        if (nom !== "") {
            consultarPorNombre(nom);
        } else {
            consultarProductos();
        }
    });
});


$(document).ready(() => consultarProductos());


function consultarProductos() {
    //Se envia la información por ajax
    $.ajax({
        url: "ProductoServlet",
        data: {
            accion: "consultarProductos"
        },
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        if (data.length > 0)
            dibujarTabla(data);
    });
}
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

function consultarPorNombre(nombre) {
    //Se envia la información por ajax
    $.ajax({
        url: 'ProductoServlet',
        data: {
            accion: "consultarPorNombre",
            nombre: nombre
        },
        type: 'POST',
        dataType: "json"
    }).done(function (data) {    
            dibujarTabla(data);        
    }).fail(() => //si existe un error en la respuesta del ajax
        alert("No hay coincidencias"));
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
                accion: $("#agregar").val(),
                codigo: $("#codigo").val(),
                nombre: $("#nombre").val(),
                precio: $("#precio").val(),
                importado: importado,
                tipo: $("#tipo").val()
            },
            type: 'POST'
        }).done(function() {
            consultarProductos(); 
        });
}


function dibujarTabla(data) {    
    $("#tablaProductos tbody").html("");
    if (data.length > 0)
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
    
    
}