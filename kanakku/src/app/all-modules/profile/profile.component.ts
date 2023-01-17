import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { FacturaListI } from 'src/app/model/facturalist.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  changePass = false;
  personalDetails = true;
  name:any
  id:any
  key:any
  idsumnistro:any
  historico:FacturaListI[];
  cadena=[]
  rs: any
  suministro:any
  dir:any
  tar:any
  total:any
  constructor(public service:AllModulesService,private Router: Router) {
    this.idsumnistro = this.Router.parseUrl(this.Router.url);
  }

  ngOnInit(): void {
    let id =this.idsumnistro.queryParams['id'];

      //obtiene valores de la factura
      this.service.getHistoricoSuministro(id).subscribe(res=>{
        this.rs = res["listarHistoricoResponses"][0]["razonSocial"];
        this.suministro = res["listarHistoricoResponses"][0]["suministro"];
        this.dir = res["listarHistoricoResponses"][0]["direccion"];
        this.tar = res["listarHistoricoResponses"][0]["tarifa"];
        this.total = res["listarHistoricoResponses"][0]["total"];



        // console.log("OBTEGO REES: ",res["listarHistoricoResponses"][0])
        // let data_hist = res["listarHistoricoResponses"]


        let keys= Object.keys(res);
        let i = 0;
        for (let prop of keys ) {
          this.cadena.push(res[prop]);
          this.cadena[i]['name'] = prop;
          i++;
        }
        console.log(this.cadena)

        },
      )
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
    // document.getElementById('about').classList.add('active');
    // document.getElementById('pass').classList.remove('active');
  }
  pass() {
    this.changePass = true;
    this.personalDetails = false;
    // document.getElementById('about').classList.remove('active');
    // document.getElementById('pass').classList.add('active');
  }
  editModal(template: TemplateRef<any>) {
    this.id = 1;
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
  }

  submit() {
    this.Router.navigateByUrl('/admin/mentor-profile');
  }
}
