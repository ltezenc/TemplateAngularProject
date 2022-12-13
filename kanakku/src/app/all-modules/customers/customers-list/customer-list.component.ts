import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  listclientes:Cliente[];
  cadena=[];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';
  public customers: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger:any= new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  constructor(private srvModuleService: AllModulesService,private http:HttpClient) { }

  ngOnInit(): void {
   this.getCustomers();
  /*   this.dtOptions = {
      pagingType: 'simple',

      pageLength: 10,
      retrieve: true,
      processing: true,
      ordering: false,
      columns: [{
        title: 'Id',
        data: 'id'
      }, {
        title: 'Nombre',
        data: 'razonSocial'
      },
      {
        title: 'Tarifa',
        data: 'prefijotarifa'
      },
      {
        title: 'potenciaContratada',
        data: 'potenciaContratada'
      },
      {
        title: 'Estado',
        data: 'estadoId'
      },
      {
        title: 'Acciones',
        defaultContent:""       
      } ],

      ajax: (dataTablesParameters: any, callback) => {
              this.http
          .get(
            'http://localhost:8080/clienteslibres/clientes/listar',
            
          )
          .subscribe((resp:any) => {
            console.log(resp)
            this.cadena = resp.clienteResponses['data'];

            callback({
              recordsTotal: resp.clienteResponses['length'],
              recordsFiltered: resp.clienteResponses['length'],
              data: resp.clienteResponses
              
            });
          });
      }
    };*/
 
}
  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  getCustomers() {
    this.customers = this.srvModuleService.customers;
    // this.srvModuleService.get(this.url).subscribe((res) => {
    //     this.customers = res;
    //   },
    // );

    this.srvModuleService.getCliente().subscribe(res=>{
      this.listclientes=res;
      let keys= Object.keys(res);
     
      let i = 0;
      for (let prop of keys ) { 
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log(this.cadena)
     },
      )
     
      this.dtTrigger.next();
  }

  filter() {}
  deleteCustomer() {
  /*  this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getCustomers();
    });*/
  }

}