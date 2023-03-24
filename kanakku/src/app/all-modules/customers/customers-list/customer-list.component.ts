import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { Suministro } from 'src/app/model/suministro';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  listclientes: Cliente[];
  listclientesOriginal: Cliente[];
  suministro: Suministro = new Suministro();
  public loader_general: boolean;
  cadena = [];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';
  public customers: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private services: ClienteService, private http: HttpClient) { this.loader_general = true }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
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
      this.listclientesOriginal = res["clienteResponses"]
      this.dtTrigger.next(0);
    },
    )

  }
  logMessageId(el) {

    let messageId = el.getAttribute('data-message-id');
    //let messageId = el.dataset.messageId;
    this.suministro.clienteId = messageId

    console.log("Message Id: ", messageId);

  }
  confirmText() {
    Swal.fire(
      'suministro agregado!',
      'has clic para continuar!',
      'success'
    )
  }
  crearSuministro(): void {

    console.log(this.suministro)
    this.services.crearsuministro(this.suministro).subscribe(res => {
      this.getCustomers()
    }, err => {
      console.log(err.message);
    }, () => {
      this.confirmText();
      console.log('completed');
    })
  }
  deleteCustomer(el) {
    this.services.delete(this.tempId).subscribe((data) => {
      this.getCustomers();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
