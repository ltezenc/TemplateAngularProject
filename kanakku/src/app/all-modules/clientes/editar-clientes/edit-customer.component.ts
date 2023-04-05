import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service'
import { Cliente } from 'src/app/model/cliente';
import { tarifaI } from 'src/app/model/tarifa.interface';
import * as alertifyjs from 'alertifyjs';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  listclientes: Cliente[];
  clienteall: Cliente = new Cliente();
  tarifa: tarifaI[];
  estEdit: boolean = false;
  public loader_general: boolean;
  apitarifa = [];
  public id: any
  public allCustomers: any
  public editCustomerForm!: FormGroup;
  cadena = [];
  constructor(public cliente: ClienteService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
    this.loader_general = true;
  }
  ngOnInit(): void {
    this.obtenerTarifa()
    let id = this.id
    this.editCustomerForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      customerEmail: ["", [Validators.required]],
      customerCurrency: ["", [Validators.required]],
      customerPrimaryContact: ["", [Validators.required]],
      customerPhone: ["", [Validators.required]],
      customerWebsite: ["", [Validators.required]],
      customerBillingName: ["", [Validators.required]],
      customerBillingState: ["", [Validators.required]],
      customerBillingAddress: ["", [Validators.required]],
      customerBillingCountry: ["", [Validators.required]],
      customerBillingCity: ["", [Validators.required]],
      customerBillingPhone: ["", [Validators.required]],
      customerBillingZip: ["", [Validators.required]],
      customerShippingName: ["", [Validators.required]],
      customerShippingState: ["", [Validators.required]],
      customerShippingAddress: ["", [Validators.required]],
      customerShippingCountry: ["", [Validators.required]],
      customerShippingCity: ["", [Validators.required]],
      customerShippingPhone: ["", [Validators.required]],
      customerShippingZip: ["", [Validators.required]],
      amount_due: [""],
      registered_on: [""],
      status: [""],
      role: [""],
    });
    this.cliente.getClienteById(id).subscribe(res => {
      this.cadena.push(res["clientebyIdResponses"][0]);
      this.loader_general = false;
    })
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  obtenerTarifa() {
    //obtiene lista de tarifa
    this.cliente.getTarifa().subscribe(res => {
      this.tarifa = res;
      let keys = Object.keys(res);
      let i = 0;
      for (let prop of keys) {
        this.apitarifa.push(res[prop]);
        this.apitarifa[i]['name'] = prop;
        i++;
      } console.log(this.apitarifa)
    },
    )
  }
  updatecliente(clienteall) {
    this.cliente.update(clienteall[0]).subscribe(rpta => {
      this.estEdit = true;
      alertifyjs.success('Cliente editado!');
      this.router.navigate(['/clientes/listar-clientes'])
    }, error => alertifyjs.error('¡Ocurrió un error ' + error.status + ' al editar!'))
  }
}
