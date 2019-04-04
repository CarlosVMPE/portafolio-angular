import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from "../interfaces/producto.interface";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get("https://angular-html-f6e65.firebaseio.com/productos_idx.json")
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
/*
    private async cargarProductos() {
    await this.http
      .get("https://angular-html-f6e65.firebaseio.com/productos_idx.json")
      .subscribe((resp: Producto[]) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 800);
        //resolve();
      });
  }*/

  getProducto(id: string) {
    return this.http.get(
      `https://angular-html-f6e65.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length == 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // Después de tener los productos
        // Aplicar filtro
        this.filtrarProducto(termino);
      });
    } else {
      //aplicar filtro
      this.filtrarProducto(termino);
    }
  }

  private filtrarProducto(termino: string) {
    /*this.productosFiltrado = this.productos.filter(producto => {
      return true;
    });*/

    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){
        this.productosFiltrado.push(prod);
      }
    });
    
  }
}
