import { Component, OnInit } from '@angular/core';
import { parametrosI } from 'src/app/model/parametros';
import { ParametrosService } from 'src/app/services/parametros.services';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {
  ngAfterViewInit() {
    this.loadcauroselbootstrap("assets/plugins/swiper-bundle/swiper-bundle.min.js");
    this.loaddbootstrapcaurosel("assets/plugins/swiper-bundle/script_carusel.js")
  }
  loadcauroselbootstrap(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loaddbootstrapcaurosel(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  constructor(private service:ParametrosService) { }
  parametros:parametrosI[];
  cadena=[]
  enviodatos = []
  ngOnInit(): void {
    //obtiene lista de fichero
      this.service.getparametrosbyfactura().subscribe(res=>{
      this.parametros=res;
      let keys= Object.keys(res);
      console.log("obteniendovalor :",res["parametrosResponses"][0])
      this.enviodatos.push(res["parametrosResponses"][0]);

      let i = 0;
      for (let prop of keys ) {
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log(this.cadena)
     },
      )
    }




}
