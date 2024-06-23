import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise<void>( ( resolve, reject ) => {
      
      this.http.get<Producto[]>('https://angular-html-1c109-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[] ) => {
          this.productos = resp;
          setTimeout(() =>{
            this.cargando = false;
          }, 250);
          resolve();
        });       
    });
    
  }
  getProducto( id: string){
    return this.http.get(`https://angular-html-1c109-default-rtdb.firebaseio.com/productos/${ id }.json`)
  }

  buscarProducto( termino: string ){

    if ( this.productos.length === 0 ) {
      //Cargar Productos
      this.cargarProductos().then( () => {
        //al ejecutar despues de tener los productos
        //Aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      //aplicar el filtro
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos(termino: string) {

    console.log(this.productos);
    

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
  
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo?.toLocaleLowerCase() ?? '';
      const categoriaLower = prod.categoria?.toLocaleLowerCase() ?? '';
  
      if (categoriaLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  } 


  // private filtrarProductos ( termino: string ){
    
  //   this.productosFiltrado = [];
    
  //   termino = termino.toLocaleLowerCase();

  //   this.productos.forEach( prod => {

  //     //const tituloLower = prod.titulo.toLocaleLowerCase();
  //     const tituloLower = prod.titulo?.toLocaleLowerCase() ?? '';
  //     const categoriaLower = prod.categoria?.toLocaleLowerCase() ?? '';

  //     if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
  //       this.productosFiltrado.push ( prod );
  //     }

  //   } );

    

  // }
}