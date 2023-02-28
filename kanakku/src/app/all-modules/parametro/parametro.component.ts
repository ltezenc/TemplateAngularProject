import { Component, OnInit } from '@angular/core';
import { parametrosI } from 'src/app/model/parametros';
import { PeriodoFactura } from 'src/app/model/PeriodoFactura';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
import { ParametrosService } from 'src/app/services/parametros.services';
import { CerrarprocesoService } from 'src/app/services/cerrarproceso.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { WebStorage } from 'src/app/core/storage/web.storage';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})

export class ParametroComponent implements OnInit {
  idfactura: any
  pfactura: any
  fecha: any
  periodo

  periodofactura:PeriodoFactura= new PeriodoFactura();
  parametro:parametrosI= new parametrosI()
  ngAfterViewInit() {
    this.loaddbootstrapcaurosel("assets/plugins/swiper-bundle/script_carusel.js")
  }
  loaddbootstrapcaurosel(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }

  constructor(private service:ParametrosService,private facturaservice:ListarFacturaService, private close:CerrarprocesoService,public router: Router, private storage: WebStorage) { }
  cadena=[]
  cadparam=[]
  ngOnInit(): void {

    this.Obtenerpfactura()
    this.Obteneridfactura()
    this.listarparametros()
    }
    listarparametros(){
    this.service.getparametrosbyfactura().subscribe(res=>{
      this.parametro = res["parametrosResponses"][0];
      console.log("Ver daatos :",this.parametro)
      this.cadparam=res["parametrosResponses"];
      this.pfactura=res["parametrosResponses"][0].pfactura
    })
}
 iduser=localStorage.getItem("idusuario");
  confirmText() {
    Swal.fire(
      'Parametros creados!',
      'has clic para continuar!',
      'success'
    )
  }
  ErrorText(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un Error!',
      footer: '<a href="">Verifica si los Parametros son correctos?</a>'
    })
  }

CrearPeriodoFactura(){
  Swal.fire({
    title: 'Proceso de Facturacion Cerrado ',
    text: "Crear nuevo proceso de Facturacion",
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Crear',
    showLoaderOnConfirm: true,
    preConfirm:(pfactura) => {
      this.periodofactura.pfactura=pfactura
      this.periodofactura.actual=true
      this.periodofactura.estado_pliego=true

      this.facturaservice.crearpfactura(this.periodofactura).subscribe(res=>
        err => {
          this.ErrorText()
          console.log(err.message);
        }, () => {

          console.log('creado');
        });this.router.navigate(['/setting/settings']);

      Swal.fire({
        title: "Periodo de Factura Creado",

      })
      },
  })
}


UpdateParametro(parametro){
this.parametro.estado=false
  this.service.updateparametro(this.parametro).subscribe()
  parametro=parametro[0]
  var id:number=+this.iduser// variable localstorage idusuario
parametro.pfactura=this.idfactura
parametro.usuarioId=id

    this.service.crearparametro(parametro).subscribe(res=>{
    this.parametro=res;
  })

}

Obteneridfactura():number{
  this.close.getpfactura().subscribe(res=>{

    this.idfactura = res["periodoFacturaResponses"][0]["id"]
    console.log(this.idfactura)
}

);return this.idfactura;

      }
Obtenerpfactura():number{
  this.close.getpfactura().subscribe(res=>{
    this.cadena=res["periodoFacturaResponses"];
    if(this.cadena.length==0){
      this.CrearPeriodoFactura()
    }
    this.pfactura = res["periodoFacturaResponses"][0]["pfactura"]

    let pliegos:string=this.pfactura
   this.fecha= pliegos.substring(0,4)+'-'+pliegos.substring(4,6)
   this.existepliego(this.fecha)   }

);return this.pfactura;

}

existepliego(fecha){
this.facturaservice.ExistePliego(fecha).subscribe(res =>   this.periodo=res,
  err => {
    console.log(err.message);
  }, () => {
    if(this.periodo==""){
      console.log("vacio")
      this.alertaperiodo()
    }
    console.log(this.periodo)
  })

  return fecha;
  }
  alertaperiodo(){
    Swal.fire({
      title: '<strong>Pliego Tarifario no Encontrado</strong>',
      icon: 'info',
      html:
        'Si continua se tomaran los registros del pliego anterior',

      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Continuar!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<a href="//localhost:4200/setting/settings"><i class="fa fa-thumbs-down"> Cancelar</i></a> ',

      cancelButtonAriaLabel: 'Cancelar'

    })
    .then((result) => {
      this.periodofactura.pfactura=this.pfactura
      if (result.isConfirmed) {
        this.facturaservice.UpdatePliego(this.periodofactura).subscribe(res=>
{})

      }
    })
  }

CrearParametro(){
var id:number=+this.iduser// variable localstorage idusuario
this.parametro.pfactura=this.idfactura
this.parametro.usuarioId=id
console.log(this.parametro)
this.service.crearparametro(this.parametro).subscribe(response =>
err => {
  this.ErrorText()
  console.log(err.message);
}, () => {
  this.listarparametros()
  console.log('completed');
})
this.confirmText();
;

}


}
