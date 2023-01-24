import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  Event,
  Router,
  NavigationStart,
  ActivatedRoute
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  AllModulesService
} from '../../../services/all-modules.service';
import {
  ClienteService
} from '../../../services/cliente.service'
import {
  Cliente
} from 'src/app/model/cliente';
import { tarifaI } from 'src/app/model/tarifa.interface';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  listclientes: Cliente[];
  tarifa:tarifaI[];
  clienteall: Cliente = new Cliente();
  public id: any
  public obj: any
  public allCustomers: any
  public editId: any;
  apitarifa=[];
  lstCustomers!: any[];
  public url: any = "customers";
  public editCustomerForm!: FormGroup;
  cadena = [];
  constructor(public cliente: ClienteService, private allModulesService: AllModulesService, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, ) {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
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
    })

  }

  obtenerTarifa(){
    //obtiene lista de tarifa
    this.cliente.getTarifa().subscribe(res=>{
      this.tarifa=res;
      let keys= Object.keys(res);

      let i = 0;
      for (let prop of keys ) {
      this.apitarifa.push(res[prop]);
      this.apitarifa[i]['name'] = prop;
      i++;
  } console.log(this.apitarifa)
     },
      )
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    ( < any > Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  editCustomer() {
    console.log("recibir datos :", this.editCustomerForm)
    if (this.editCustomerForm.valid) {
      let obj = {
        name: this.editCustomerForm.value.customerName,
        email: this.editCustomerForm.value.customerEmail,
        phone: this.editCustomerForm.value.customerPrimaryContact,
        amount_due: this.editCustomerForm.value.amount_due,
        registered_on: this.editCustomerForm.value.registered_on,
        status: this.editCustomerForm.value.status,
        role: this.editCustomerForm.value.role,
        id: this.editId,
      };
      console.log("recibir datos :", obj)
      // this.allModulesService.update(obj, this.url).subscribe((data1) => {
      // });
      // this.toastr.success("", "Edited successfully!");
      // this.router.navigate(["/customers"]);
    } else {
      // this.toastr.warning("Mandatory fields required", "");
    }
  }
  edit(value: any) {
    this.editId = value;
    const index = this.allCustomers.findIndex((item: any) => {
      return item.id === value;
    });
    let toSetValues = this.allCustomers[index];
    this.editCustomerForm.patchValue({
      customerName: toSetValues.name,
      customerEmail: toSetValues.email,
      customerCurrency: toSetValues.email,
      customerPrimaryContact: toSetValues.phone,
      customerPhone: '9547895650',
      customerWebsite: 'exapmle@mail.com',
      customerBillingName: toSetValues.name,
      customerBillingState: 'AL',
      customerBillingAddress: '5754 Airport Rd',
      customerBillingCountry: 'United States',
      customerBillingCity: 'Coosada',
      customerBillingPhone: '888-777-6655',
      customerBillingZip: '36020',
      customerShippingName: toSetValues.name,
      customerShippingState: 'AL',
      customerShippingAddress: '5754 Airport Rd',
      customerShippingCountry: 'United States',
      customerShippingCity: 'Coosada',
      customerShippingPhone: '888-777-6655',
      customerShippingZip: '36020',
      amount_due: toSetValues.amount_due,
      registered_on: toSetValues.registered_on,
      status: toSetValues.status,
      role: toSetValues.role,
    });
  }

  // updatecliente(){

  //   let razonsocial =<HTMLInputElement> document.getElementById('txt_razonSocial');
  //   let direccion =<HTMLInputElement> document.getElementById('txt_direccion');
  //   let email =<HTMLInputElement> document.getElementById('txt_email');
  //   let ruc =<HTMLInputElement> document.getElementById('txt_ruc');
  //   let nombreResponsable =<HTMLInputElement> document.getElementById('txt_nombreResponsable');
  //   let telefono =<HTMLInputElement> document.getElementById('txt_telefono');

  //   let tarifa =<HTMLInputElement> document.getElementById('txt_tarifa');
  //   let tipoCambio =<HTMLInputElement> document.getElementById('txt_tipoCambio');
  //   let precioFHP =<HTMLInputElement> document.getElementById('txt_precioFHP');
  //   let potenciaContratada =<HTMLInputElement> document.getElementById('txt_potenciaContratada');
  //   let precioHP =<HTMLInputElement> document.getElementById('txt_precioHP');
  //   let estado =<HTMLInputElement> document.getElementById('txt_estado');

  //   this.obj = {
  //     id: this.id,
  //     ruc: ruc.value,
  //     razonsocial:razonsocial.value,
  //     direccion:direccion.value,
  //     telefono:telefono.value,
  //     nombreResponsable:nombreResponsable.value,
  //     email:email.value,
  //     precioFHP:precioFHP.value,
  //     empresaId:1,
  //     estadoId:estado.value,
  //     potenciaContratada:potenciaContratada.value,
  //     tarifa:tarifa.value,
  //     precioHP:precioHP.value,
  //     tipoCambio:tipoCambio.value,
  //     ppi0:0,
  //     pgn0:0,
  //     comercializacion:0,
  //     cargoFijo:0,
  //   };
  //   this.cliente.update(this.obj).subscribe(response => this.router.navigate(['/customers/customers-list']),
  //   err => {
  //     // this.ErrorText()
  //     console.log(err.message);
  //   }, () => {

  //     console.log(this.obj);
  //   })
  //   // this.confirmText();
  //   // this.toastr.success("", "Edited successfully!");
  //   // this.router.navigate(["/customers"]);

  // }

  updatecliente(clienteall) {
    this.cliente.update(clienteall[0]).subscribe(response => this.router.navigate(['/customers/customers-list']),
      err => {
        // this.ErrorText()
        console.log(err.message);
        console.log(clienteall);
      }, () => {

        console.log(clienteall);
      })

}



}
