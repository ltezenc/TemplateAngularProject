import { Component, OnInit, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from '../../../services/all-modules.service';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { tarifaI } from 'src/app/model/tarifa.interface';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  cliente:Cliente= new Cliente();
 tarifa:tarifaI[];
 apitarifa=[];
  public id:any
  public url: any = "customers";
  page = 'Add Customer';
  public pipe = new DatePipe("en-US");
  myDate = new Date();
  public addCustomerForm!: FormGroup;
  constructor(public router: Router, location: Location,private clienteService:ClienteService ,private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.obtenerTarifa()
    this.addCustomerForm = this.formBuilder.group({
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
    });
  }
  ngAfterViewInit() {
    this.loadformwizardbootstrap("assets/plugins/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js")
    this.loadformwizardprettify("assets/plugins/twitter-bootstrap-wizard/prettify.js")
    this.loadformwizard("assets/plugins/twitter-bootstrap-wizard/form-wizard.js")
  }
  loadformwizardbootstrap(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadformwizardprettify(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadformwizard(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control:any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  addCustomer() {
    if(this.addCustomerForm.invalid){
      this.markFormGroupTouched(this.addCustomerForm)
      return
    }
    else {

    let DateJoin = this.pipe.transform(
      this.myDate,"dd-MM-yyyy"
    );
    let obj = {
      name : this.addCustomerForm.value.customerName,
      email : this.addCustomerForm.value.customerEmail,
      phone : this.addCustomerForm.value.customerPrimaryContact,
      amount_due : "$8295",
      registered_on : DateJoin,
      status : "Active",
      role: "Customer"
    };
    this.allModulesService.add(obj, this.url).subscribe((data) => {

    });
    this.router.navigate(["/customers"]);
    this.toastr.success("Customer added sucessfully...!", "Success");
    }
  }
  obtenerTarifa(){
    //obtiene lista de tarifa
    this.clienteService.getTarifa().subscribe(res=>{
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
  confirmText() {
    Swal.fire(
      'Cliente creado!',
      'has clic para continuar!',
      'success'
    )
  }

    crearCliente():void{
      console.log(this.cliente)
      this.clienteService.create(this.cliente).subscribe(response => this.router.navigate(['/customers/customers-list']),
       err => {
        console.log(err.message);
      }, () => {
       
        console.log('completed');
      })
      this.confirmText();
    }
 
}
