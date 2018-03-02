<%-- 
    Document   : Productos
    Created on : 26/02/2018, 10:43:23 PM
    Author     : slon
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Productos</title>
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        <script src="js/script.js" type="text/javascript"></script>
        
    </head>
    <body>
        <div class="container">  
            <br>
            <form class="form-inline">
                <div class="form-group col-sm-4">
                    <label for="buscarNombre">Nombre</label>
                    <input type="text" class="form-control" id="buscarNombre">
                    <button type="button" class="btn" id="buscarPorNombre">Buscar</button>
                </div>
                <div class="form-group col-sm-4">
                    <label for="buscarTipo">Tipo</label>
                    <input type="text" class="form-control" id="buscarTipo">
                    <button type="button" class="btn" name="buscarPorTipo">Buscar</button>
                </div>
            </form>
        </div>
        <br><br>
        <div class="container table-responsive">
            <table class="table table-condensed" id="tablaProductos">
                <thead>
                        <tr>
                            <th><b>Nombre</b></th>
                            <th><b>Importado</b></th>                                
                            <th><b>Precio</b></th>
                            <th><b>Tipo</b></th>
                            <th><b>Porcentaje</b></th>
                            <th><b>Impuesto</b></th>
                            <th><b>Precio Final</b></th>
                        </tr>
                    </thead>
                <tbody></tbody>
                </table>
        </div>
        <br><br>
        <div class="container">  
            <form class="form-horizontal">
                    
                <div class="form-group row">
                    <label class="control-label col-sm-2" for="codigo">Codigo</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="codigo">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-sm-2" for="nombre">Nombre</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="nombre">
                    </div>
                </div>
                    
                <div class="form-group row">
                    <label class="control-label col-sm-2" for="precio">Precio</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="precio">
                    </div>
                </div>
                        
                <div class="form-group row">
                    <label class="col-sm-2 control-label">Importado</label>
                    <div class="col-sm-2">
                        <div class="form-check">
                            <label class="form-check-label control-label">
                                <input class="form-check-input" type="checkbox" id="importado">
                            </label>
                        </div>
                    </div>
                </div>
                        
                <div class="form-group row">
                    <label class="col-sm-2 control-label">Tipo</label>
                        <div class="col-sm-2">
                            <select class="form-control" id="tipo">
                                 <option>Canasta</option>
                                 <option>Popular</option> 
                                 <option>Suntuario</option>                                    
                            </select>
                        </div>
                </div>
                
                <div class="form-group row">
                    <div class="col-sm-4">
                        <input type="submit" class="btn btn-primary pull-right" id="agregar" value="Agregar">
                    </div>
                </div>
               
            </form>
        </div>
    </body>
</html>
