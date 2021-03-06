/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package laboratorio01.Controlador;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import laboratorio01.AccesoDatos.ServicioProducto;
import laboratorio01.LogicaNegocio.Producto;

/**
 *
 * @author slon
 */
public class ProductoServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            /* TODO output your page here. You may use following sample code. */
            
            //String para guardar el JSON generaro por al libreria GSON
            String json;
            String json2;
           
            //Se crea el objeto
            Producto p = new Producto();
            
            ServicioProducto sp = new ServicioProducto();
            
            Thread.sleep(500);
            
            String accion = request.getParameter("accion");
            List<Double> listaCalculo = new ArrayList();
            switch (accion) {
                
                case "consultarProductos":
                    
                    List<Producto> list = new ArrayList(sp.listarProducto());
                    for (Producto product : list) {
                        
                        listaCalculo.add(sp.impuesto(product));
                        listaCalculo.add(sp.totalPagar(product));
                        
                    }
                    json = new Gson().toJson(list);   
                    json2 = new Gson().toJson(listaCalculo);  
                    out.print(json);
                    break;
                    
          case "agregar":
                    p.setCodigo(request.getParameter("codigo"));
                    p.setNombreProducto(request.getParameter("nombre"));
                    p.setPrecio(Double.parseDouble(request.getParameter("precio")));
                    p.setImportado(Integer.parseInt(request.getParameter("importado")));
                    p.setTipo(request.getParameter("tipo")); 
                    
                    sp.insertarProducto(p);
                    
                    out.print("C~El objeto fue ingresado correctamente");
                    break;
                    
                case "consultarPorNombre":
                    String nombre = request.getParameter("nombre");
                    json = new Gson().toJson(sp.buscarProducto(nombre));
                    out.print(json);
                    break;
                    /*
                case "getImpuesto":
                    request.set
                    sp.impuesto(request.getParameter("rowData"));
                    Double imp = Double.parseDouble(request.getParameter("impuesto");
                    out.print();
                break;
                    */
                default:
                    out.print("E~No se indicó la acción que se desea realizare");
                    break;
            }

        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage() );
        } 
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
