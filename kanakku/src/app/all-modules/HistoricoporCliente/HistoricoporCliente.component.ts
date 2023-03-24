import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './HistoricoporCliente.component.html',
  styleUrls: ['./HistoricoporCliente.component.css'],
})
export class ProfileComponent implements OnInit {
  changePass = false;
  personalDetails = true;
  public loader_general: boolean;
  rpta_valid: any;
  name: any
  id: any
  key: any
  idsumnistro: any
  historico: FacturaListI[];
  cadena = []
  rs: any
  suministro: any
  dir: any
  tar: any
  total: any
  constructor(public service: ClienteService, private Router: Router) {
    this.idsumnistro = this.Router.parseUrl(this.Router.url);
    this.loader_general = true;
  }

  ngOnInit(): void {
    let id = this.idsumnistro.queryParams['id'];

    //obtiene valores de la factura
    this.service.getHistoricoSuministro(id).subscribe(res => {
      this.loader_general = false;
      let validar_rptas = res["listarHistoricoResponses"].length;
      // 1: con datos       0: sin datos
      this.rpta_valid = validar_rptas != 0 ? 1 : 0;

      if (this.rpta_valid == 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontraron resultados',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.Router.navigate(['invoices/invoice-grid'])
        })
      } else {
        this.rs = res["listarHistoricoResponses"][0]["razonSocial"];
        this.suministro = res["listarHistoricoResponses"][0]["suministro"];
        this.dir = res["listarHistoricoResponses"][0]["direccion"];
        this.tar = res["listarHistoricoResponses"][0]["tarifa"];
        this.total = res["listarHistoricoResponses"][0]["total"];
        let keys = Object.keys(res);
        let i = 0;
        for (let prop of keys) {
          this.cadena.push(res[prop]);
          this.cadena[i]['name'] = prop;
          i++;
        }
        console.log(this.cadena)
      }


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
