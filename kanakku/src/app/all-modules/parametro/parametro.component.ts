import { Component, OnInit } from '@angular/core';
import { parametrosI } from 'src/app/model/parametros';
import { ParametrosService } from 'src/app/services/parametros.services';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  constructor(private service:ParametrosService) { }
  parametros:parametrosI[];
  cadena=[]
  ngOnInit(): void {
    //obtiene lista de fichero
      this.service.getparametrosbyfactura().subscribe(res=>{
      this.parametros=res;
      let keys= Object.keys(res);
     
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
