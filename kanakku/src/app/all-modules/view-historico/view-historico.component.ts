import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllModulesService } from 'src/app/services/all-modules.service';

@Component({
  selector: 'app-view-historico',
  templateUrl: './view-historico.component.html',
  styleUrls: ['./view-historico.component.css']
})
export class ViewHistoricoComponent implements OnInit {

  get_url:any
  cadena=[]
  constructor(public service:AllModulesService,private Router: Router) {
    this.get_url = this.Router.parseUrl(this.Router.url);
  }

  // sum=26433035&fact=2022-08-01
  ngOnInit(): void {
    let sumnistro =this.get_url.queryParams['sum'];
    let pfactura =this.get_url.queryParams['fact'];
    console.log("SUM :",sumnistro)
    console.log("PAR :",pfactura)
    this.service.getHistoricoSuministroFactura(sumnistro,pfactura).subscribe(res=>{

      let keys= Object.keys(res);
      let i = 0;
      for (let prop of keys ) {
        this.cadena.push(res[prop]);
        this.cadena[i]['name'] = prop;
        i++;
      }
      console.log("OBTEGO REES: ",this.cadena)

      },
    )
  }

}
