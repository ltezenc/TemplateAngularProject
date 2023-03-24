import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { FicheroListI } from 'src/app/model/ficherolist.interface';

@Component({
  selector: 'app-view-historico',
  templateUrl: './view-historico.component.html',
  styleUrls: ['./view-historico.component.css']
})
export class ViewHistoricoComponent implements OnInit {

  get_url: any
  fecha: any
  cadena = []
  ficheros: FicheroListI[];
  public loader_general: boolean;
  constructor(public service: ClienteService, private Router: Router) {
    this.get_url = this.Router.parseUrl(this.Router.url);
    this.fecha = this.get_url.queryParams['fact'];
    this.loader_general = true;
  }

  // sum=26433035&fact=2022-08-01
  ngOnInit(): void {
    let sumnistro = this.get_url.queryParams['sum'];
    let pfactura = this.get_url.queryParams['fact'];
    console.log("SUM :", sumnistro)
    console.log("PAR :", pfactura)
    this.service.getHistoricoSuministroFactura(sumnistro, pfactura).subscribe(res => {
      this.loader_general = false;
      this.ficheros = res["facturacionByClienteIdResponse"];
    },
    )
  }

}
