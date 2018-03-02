
package my.control;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Observable;
import javax.swing.event.TableModelListener;
import javax.swing.table.AbstractTableModel;
import javax.swing.table.TableModel;

import laboratorio01.AccesoDatos.GlobalException;
import laboratorio01.AccesoDatos.NoDataException;
import laboratorio01.AccesoDatos.ServicioProducto;
import laboratorio01.LogicaNegocio.Producto;

public class Control extends Observable{
    
    public Control(){
        servPro = new ServicioProducto();
    }
    
    public void agregarProducto(String cod, String nombre, Double precio, Integer importado, String tipo) {
       prod = new Producto(cod, nombre, precio, importado, tipo);
        try {
            servPro.insertarProducto(prod);
            setChanged();
            notifyObservers(prod);
        } catch (GlobalException ex) {
            Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoDataException ex) {
            Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public Producto buscarProducto(String nombre){
        try {
            return servPro.buscarProducto(nombre);
        } catch (GlobalException ex) {
            Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoDataException ex) {
            Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public TableModel modeloTabla() {
        return new AbstractTableModel() {
            @Override
            public int getRowCount() {
                try {
                    int rows = servPro.listarProducto().size();
                    return rows;
                } catch (GlobalException ex) {
                    Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
                } catch (NoDataException ex) {
                    Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
                }
                return 0;
            }

            @Override
            public int getColumnCount() {
                return 7;
            }

            @Override
            public String getColumnName(int columnIndex) {
                return Producto.nombreCampos()[columnIndex];
            }

            @Override
            public Class<?> getColumnClass(int columnIndex) {
                return getValueAt(0, columnIndex).getClass();
            }

            @Override
            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return (columnIndex >= 0);
            }

            @Override
            public Object getValueAt(int rowIndex, int columnIndex) {
                try {
                    ArrayList<Producto> list = new ArrayList(servPro.listarProducto());
                    if(columnIndex == 1){
                        if(list.get(rowIndex).getImportado() == 1)
                            return "Si";
                        return "No";
                    }
                    else if(columnIndex == 4){
                        if("Canasta".equals(list.get(rowIndex).getTipo()))
                            return 5;
                        if("Popular".equals(list.get(rowIndex).getTipo()))
                            return 13;
                        if("Suntuario".equals(list.get(rowIndex).getTipo()))
                            return 15;
                    }
                    else if(columnIndex == 5){
                        return servPro.impuesto(list.get(rowIndex));
                    }
                    else if(columnIndex == 6){
                        return servPro.totalPagar(list.get(rowIndex));
                    }
                    return list.get(rowIndex).toArray()[columnIndex];
                } catch (GlobalException ex) {
                    Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
                } catch (NoDataException ex) {
                    Logger.getLogger(Control.class.getName()).log(Level.SEVERE, null, ex);
                }
                return null;
            }

            @Override
            public void setValueAt(Object aValue, int rowIndex, int columnIndex) {
                throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
            }
        };
    }
    
    public void actualizar(Object evento){
        setChanged();
        notifyObservers(evento);
    }
    
    private final ServicioProducto servPro;
    private Producto prod; 

    
}
