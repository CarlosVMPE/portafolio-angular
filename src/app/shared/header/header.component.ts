import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(public _servicio: InfoPaginaService, private router: Router) {}

  ngOnInit() {}

  buscarProducto( termino: string ){
    if(termino.length < 1){
      this.router.navigate(["/home"]);
      return;
    }
    this.router.navigate(['/search', termino]);
  }
}
