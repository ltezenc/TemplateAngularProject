import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { Suministro } from 'src/app/model/suministro';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  listclientes:Cliente[];
  suministro: Suministro= new Suministro();
  cadena=[];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';
  public customers: any = [];
  dtTrigger:any= new Subject();
  constructor(private services: ClienteService,private http:HttpClient) { }

  ngOnInit(): void {
   this.getCustomers();

}
  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  getCustomers() {

    this.services.getCliente().subscribe(res=>{
      this.listclientes=res;
      let keys= Object.keys(res);

      let i = 0;
      for (let prop of keys ) {
        this.cadena=[],
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log(this.cadena)

     },
      )

      this.dtTrigger.next();
  }

  logMessageId(el){

    let messageId = el.getAttribute('data-message-id');
    //let messageId = el.dataset.messageId;
    this.suministro.clienteId=messageId

    console.log("Message Id: ", messageId);

  }
  confirmText() {
    Swal.fire(
      'suministro agregado!',
      'has clic para continuar!',
      'success'
    )
  }
  crearSuministro():void{

    console.log(this.suministro)
    this.services.crearsuministro(this.suministro).subscribe(res=>{this.getCustomers()
    }, err => {
      console.log(err.message);
    }, () => {
      this.confirmText();
      console.log('completed');
    })
  }
  buscarAll(x){
    let texto = ""; //Para validar por que campo buscar
    if(x == "nombre")
    {
      let nombre =<HTMLInputElement> document.getElementById('bsq_nombre');
      texto += nombre.value.toLocaleLowerCase()
    }else
    if(x == "tarifa"){
      let tarifa =<HTMLInputElement> document.getElementById('bsq_tarifa');
      texto += tarifa.value.toLocaleLowerCase()
    }else{
      let suministro =<HTMLInputElement> document.getElementById('bsq_suministro');
      texto += suministro.value.toLocaleLowerCase()
    }
    let registros = this.cadena[0] //obtengo todo el registro
    let resultado =  <HTMLInputElement> document.querySelector('#resultados_busqueda');
    let html = "";
    let ocultar_tabla =<HTMLInputElement> document.querySelector('#data-table'); //Tabla con registro
    ocultar_tabla.style.display = "none"; //Ocultar Tabla con registro
    let mostrar_tabla =<HTMLInputElement> document.querySelector('#table-data'); //Tabla para mostrar los registros de busqueda
    mostrar_tabla.style.display = "inline-table"; //Mostrar Tabla para  los registros de busqueda
    for(let registro of registros)
    {
      let buscar = "";

      if(x == "nombre")
        {
          buscar += registro.razonSocial.toLocaleLowerCase();
        }else
        if(x == "tarifa"){
          buscar += registro.prefijotarifa.toLocaleLowerCase();
        }else{
          buscar += registro.suministro.toLocaleLowerCase();
        }
      if(buscar.indexOf(texto) !== -1){ //lo encontró
        html += `
        <tr>
          <td>${ registro.id }</td>
          <td>${ registro.razonSocial }</td>
          <td>${ registro.prefijotarifa }</td>
          <td>${ registro.potenciaContratada }</td>`
          if(registro.suministro == null){
            html += `
            <td>
              <span class="badge badge-pill bg-danger-light" (click)="tempId = ${registro.id}" data-bs-toggle="modal" data-bs-target="#suministroModal"
                (click)="logMessageId(messageEl)">
                --
              </span>
            </td>`
          }else{
            html += `
                <td>
                ${ registro.suministro }
                </td>`
          }
          if(registro.estadoId == 1)
          {
            html += `
            <td>
              <span class="badge badge-pill bg-success-light">Activo</span>
            </td>
            `
          }else{
            html += `
            <td>
              <span class="badge badge-pill bg-danger-light">Activo</span>
            </td>`
          }
      html += `
      <td class="text-end">
        <a href="/customers/edit-customer?id=${registro.id}"
          class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a>
        <a (click)="tempId = ${registro.id}" data-bs-toggle="modal" data-bs-target="#delete_customer"
          class="btn btn-sm btn-white text-danger me-2"><i class="far fa-trash-alt me-1"></i>Delete</a>
      </td>
          `
          resultado.innerHTML = html;
      }
      if(texto === ""){
        ocultar_tabla.style.display = "inline-table";
        resultado.innerHTML = "";
        mostrar_tabla.style.display = "none";
      }
    }
  }


  deleteCustomer(el) {
   this.services.delete(this.tempId).subscribe((data) => {
      this.getCustomers();
    });
  }

}
