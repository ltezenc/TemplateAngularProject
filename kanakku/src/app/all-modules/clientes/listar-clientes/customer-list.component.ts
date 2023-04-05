import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { Suministro } from 'src/app/model/suministro';
import { DataTableDirective } from 'angular-datatables'
import { ClienteService } from 'src/app/services/cliente.service';
import * as alertifyjs from 'alertifyjs';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  listclientes: Cliente[];
  listClt: Cliente = new Cliente()
  public loader_general: boolean;
  public pageclt: number;
  suministro: Suministro = new Suministro();
  cadena = [];
  errorMessage: any;
  public tempId: any;
  public name: any;
  url: any = 'customers';
  public customers: any = [];

  dtTrigger: any = new Subject();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  constructor(private services: ClienteService, private http: HttpClient) { this.loader_general = true }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    }
    this.getCustomers();
  }
  getCustomers() {
    this.services.getCliente().subscribe(res => {
      this.loader_general = false;
      this.listclientes = res["clienteResponses"]
      this.initDatatable();
    },error => alertifyjs.error('¡Ocurrió un error '+error.status+'!'))
  }
  logMessageId(el) {
    let messageId = el.getAttribute('data-message-id');
    //let messageId = el.dataset.messageId;
    this.suministro.clienteId = messageId
    console.log("Message Id: ", messageId);
  }
  crearSuministro(): void {
    this.services.crearsuministro(this.suministro).subscribe(res => {
      this.getCustomers()
      alertifyjs.success('¡Suministro agregado!')
    },error => alertifyjs.error('¡Ocurrió un error '+error.status+'!'))
  }
  deleteCustomer(el,nombre) {
    this.services.delete(this.tempId).subscribe((data) => {
      this.getCustomers();
      alertifyjs.success('¡Cliente '+nombre+' eliminado!');
    },error => alertifyjs.error('¡Ocurrió un error '+error.status+' al eliminar!'));
  }
  cargarinfoclientes(id){
    this.services.getClienteById(id).subscribe(res => {
      this.listClt = res["clientebyIdResponses"][0];
      console.log("datos: ",this.listClt)
    },error => alertifyjs.error('¡Ocurrió un error '+error.status+'!'))
  }
  initDatatable() {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
