import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductosService } from "src/app/services/productos.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  termino: string;
  busquedaCargando = true;

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService
  ) {}

  ngOnInit() {

    setTimeout(() => {
      this.busquedaCargando = false;
    }, 500);

    this.route.params.subscribe(params => {
      this.termino = params["termino"];
      //console.log(params["termino"]);
      this.productoService.buscarProducto(params["termino"]);
    });
  }
}
