import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoFactura } from 'src/app/model/PeriodoFactura';
import { CerrarprocesoService } from 'src/app/services/cerrarproceso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-close-process',
  templateUrl: './close-process.component.html',
  styleUrls: ['./close-process.component.css']
})
export class CloseProcessComponent implements OnInit {
  pfactura: PeriodoFactura[];
  public loader_general: boolean;
  cadena = [];
  constructor(private close: CerrarprocesoService, public router: Router) { this.loader_general = true; }

  ngOnInit(): void {
    this.obtenerpfactura()
  }

  ErrorText() {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrio un Error!',
      text: 'No se pudo Cerrar el proceso',
      footer: '<a href="">Por favor comunicate con Soporte TI</a>'
    })
  }
  ConfirmarCierre() {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "No se puede revertir el Cierre del proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar Proceso !',

    }).then((result) => {
      let timerInterval
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cerrando proceso comercial',
          timer: 8000,
          didOpen: () => {
            const content = Swal.getHtmlContainer()
            const $ = content.querySelector.bind(content)
            Swal.showLoading()
          },
          willClose: () => {
            //esperamos el temporizador y llamamos al metodo
            this.close.cerrarproceso().subscribe(response => {

            }, err => {
              this.ErrorText()
              console.log(err.message);
            }, () => {
              clearInterval(timerInterval)
              Swal.fire(
                'Proceso Cerrado!',
                'El proceso cerrado exitosamente',
                'success'
              ); this.router.navigate(['/setting']);
            })
          }

        })

      }
    })
  }



  obtenerpfactura() {
    this.close.getpfactura().subscribe(res => {
      this.loader_general = false;
      this.pfactura = res;
      let keys = Object.keys(res);

      let i = 0;
      for (let prop of keys) {
        this.cadena.push(res[prop]);
        this.cadena[i]['name'] = prop;
        i++;
      } console.log(this.cadena)
    }

    )
  }

}
