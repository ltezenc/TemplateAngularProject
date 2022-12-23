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

      let tarifa =<HTMLInputElement> document.getElementById('txttarifa');
      let potenciaconcentrada =<HTMLInputElement> document.getElementById('txtpotenciaContratada');
      let tipocambio =<HTMLInputElement> document.getElementById('txttipodecambio');
      let precioporhora =<HTMLInputElement> document.getElementById('txtprecioporhorapunta');
      let preciofuerahorapunta =<HTMLInputElement> document.getElementById('txtpreciofuerahorapunta');
      let estado =<HTMLInputElement> document.getElementById('shred-info');


      let ppi =<HTMLInputElement> document.getElementById('txtppi');
      let pgn =<HTMLInputElement> document.getElementById('txtpgn');
      let comercializacion =<HTMLInputElement> document.getElementById('txtcomercializacion');
      let cargofijo =<HTMLInputElement> document.getElementById('txtcargofijo');

      if (tarifa.value == "" && potenciaconcentrada.value == "" && tipocambio.value == "" && precioporhora.value == "" && preciofuerahorapunta.value == "" && estado.value == "" && ppi.value == ""&& pgn.value == ""&& comercializacion.value == ""&& cargofijo.value == "") {
        document.querySelector(".sv_tf").innerHTML = "* Debe seleccionar una opción."
        document.querySelector(".sv_pc").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_tc").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_hp").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_fpc").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_est").innerHTML = "* Debe seleccionar una opción."
        document.querySelector(".sv_ppi").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_pgn").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_cmr").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".sv_cf").innerHTML = "* Este campo no puede quedar vacío."

      } else if (
        (tarifa.value == "" || potenciaconcentrada.value == "" || tipocambio.value == "" || precioporhora.value == "" || preciofuerahorapunta.value == "" || estado.value == "") ||
        (potenciaconcentrada.value.length < 2 || tipocambio.value.length < 2 || precioporhora.value.length < 2 || preciofuerahorapunta.value.length < 2) || (!this.validateDecimal(potenciaconcentrada.value)) || (!this.validateDecimal(ppi.value)) || (!this.validateDecimal(pgn.value))
      ) {

        if (tarifa.value == "") {
          document.querySelector(".sv_tf").innerHTML = "* Debe seleccionar una opción."
        }else {
          document.querySelector(".sv_tf").innerHTML = ""
        }

        if (estado.value == "") {
          document.querySelector(".sv_est").innerHTML = "* Debe seleccionar una opción."
        }else {
          document.querySelector(".sv_est").innerHTML = ""
        }

        if (potenciaconcentrada.value == "") {
          document.querySelector(".sv_pc").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(potenciaconcentrada.value)) {
          document.querySelector(".sv_pc").innerHTML = "* Debe ingresar solo números."
        } else {
          document.querySelector(".sv_pc").innerHTML = ""
        }


        if (ppi.value == "") {
          document.querySelector(".sv_ppi").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(ppi.value)) {
          document.querySelector(".sv_ppi").innerHTML = "* Debe ingresar solo números."
        } else {
          document.querySelector(".sv_ppi").innerHTML = ""
        }



        if (pgn.value == "") {
          document.querySelector(".sv_pgn").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(pgn.value)) {
          document.querySelector(".sv_pgn").innerHTML = "* Debe ingresar solo números."
        } else {
          document.querySelector(".sv_pgn").innerHTML = ""
        }

        if (comercializacion.value == "") {
          document.querySelector(".sv_cmr").innerHTML = "* Debe seleccionar una opción."
        }else {
          document.querySelector(".sv_cmr").innerHTML = ""
        }
        if (cargofijo.value == "") {
          document.querySelector(".sv_cf").innerHTML = "* Debe seleccionar una opción."
        }else {
          document.querySelector(".sv_cf").innerHTML = ""
        }

        if (tipocambio.value == "") {
          document.querySelector(".sv_tc").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(tipocambio.value)) {
          document.querySelector(".sv_tc").innerHTML = "* Debe ingresar solo números."
        }else {
          document.querySelector(".sv_tc").innerHTML = ""
        }

        if (precioporhora.value == "") {
          document.querySelector(".sv_hp").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(precioporhora.value)) {
          document.querySelector(".sv_hp").innerHTML = "* Debe ingresar solo números."
        }else {
          document.querySelector(".sv_hp").innerHTML = ""
        }

        if (preciofuerahorapunta.value == "") {
          document.querySelector(".sv_fpc").innerHTML = "* Este campo no puede quedar vacío."
        } else if (!this.validateDecimal(preciofuerahorapunta.value)) {
          document.querySelector(".sv_fpc").innerHTML = "* Debe ingresar solo números."
        }else {
          document.querySelector(".sv_fpc").innerHTML = ""
        }


      }else{

        document.querySelector(".sv_tf").innerHTML = ""
        document.querySelector(".sv_pc").innerHTML = ""
        document.querySelector(".sv_tc").innerHTML = ""
        document.querySelector(".sv_hp").innerHTML = ""
        document.querySelector(".sv_fpc").innerHTML = ""
        document.querySelector(".sv_est").innerHTML = ""

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

    verificarNombre($n) {
      var ExpRegular_Nombre = /^[A-Za-zÑñÁÉÍÓÚáéíóúüÜ]+((?:[\s{1}][A-Za-zÑñÁÉÍÓÚáéíóúüÜ]+)+)?$/;
      return ExpRegular_Nombre.test($n);
    }

    verificarCorreo($n) {
      var ExpRegular_Correo = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      return ExpRegular_Correo.test($n);
    }

    verificarNumCel($m) {
      var ExpRegular_Num = /^[\d]+$/;
      return ExpRegular_Num.test($m);
    }

    validateDecimal(valor) {
      var RE = /^\d*\,?\d*$/;
      if (RE.test(valor)) {
          return true;
      } else {
          return false;
      }
  }

    nextTab()
    {
      let razonsocial =<HTMLInputElement> document.getElementById('txtrazonsocial');
      let ruc =<HTMLInputElement> document.getElementById('txtruc');
      let direccion =<HTMLInputElement> document.getElementById('txtdireccion');
      let responsablelegal =<HTMLInputElement> document.getElementById('txtresponsablelegal');
      let email =<HTMLInputElement> document.getElementById('txtemail');
      let telefono =<HTMLInputElement> document.getElementById('txttelefono');

      if (razonsocial.value == "" && ruc.value == "" && direccion.value == "" && responsablelegal.value == "" && email.value == "" && telefono.value == "") {

        document.querySelector(".co_rs").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".co_rc").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".co_dir").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".co_de").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".co_em").innerHTML = "* Este campo no puede quedar vacío."
        document.querySelector(".co_tl").innerHTML = "* Este campo no puede quedar vacío."

      } else if (
        (razonsocial.value == "" || ruc.value == "" || direccion.value == "" || responsablelegal.value == "" || email.value == "" || telefono.value == "") ||
        (razonsocial.value.length < 2 || ruc.value.length != 11 || direccion.value.length < 2 || responsablelegal.value.length < 2 || email.value.length < 2 || telefono.value.length != 9) ||
        (!this.verificarNombre(responsablelegal.value) || !this.verificarNumCel(ruc.value) || !this.verificarNumCel(telefono.value) || !this.verificarCorreo(email.value))
      ) {

        if (email.value == "") {
          document.querySelector(".co_em").innerHTML = "* Este campo no puede quedar vacío."
        } else if (email.value.length < 2) {
          document.querySelector(".co_em").innerHTML = "* Debe tener 6 o más caractéres."
        } else if (!this.verificarCorreo(email.value)) {
          document.querySelector(".co_em").innerHTML = "* Debe incluir @ en la dirección de correo electrónico."
        } else {
          document.querySelector(".co_em").innerHTML = ""
        }

        if (ruc.value == "") {
          document.querySelector(".co_rc").innerHTML = "* Este campo no puede quedar vacío."
        } else if (ruc.value.length != 9 && !this.verificarNumCel(ruc.value)) {
          document.querySelector(".co_rc").innerHTML = "* Debe ingresar solo números."
        } else if (ruc.value.length != 11) {
          document.querySelector(".co_rc").innerHTML = "* Debe tener 11 dígitos."
        } else if (!this.verificarNumCel(ruc.value)) {
          document.querySelector(".co_rc").innerHTML = "* Ingreso de datos inválidos."
        } else {
          document.querySelector(".co_rc").innerHTML = ""
        }

        if (telefono.value == "") {
          document.querySelector(".co_tl").innerHTML = "* Este campo no puede quedar vacío."
        } else if (telefono.value.length != 9 && !this.verificarNumCel(telefono.value)) {
          document.querySelector(".co_tl").innerHTML = "* Debe ingresar solo números."
        } else if (telefono.value.length != 9) {
          document.querySelector(".co_tl").innerHTML = "* Debe tener 9 dígitos."
        } else if (!this.verificarNumCel(telefono.value)) {
          document.querySelector(".co_tl").innerHTML = "* Ingreso de datos inválidos."
        } else {
          document.querySelector(".co_tl").innerHTML = ""
        }

        if (razonsocial.value == "") {
          document.querySelector(".co_rs").innerHTML = "* Este campo no puede quedar vacío."
        } else if (razonsocial.value.length < 2) {
          document.querySelector(".co_rs").innerHTML = "* Debe tener 2 o más caractéres."
        }else {
          document.querySelector(".co_rs").innerHTML = ""
        }

        if (direccion.value == "") {
          document.querySelector(".co_dir").innerHTML = "* Este campo no puede quedar vacío."
        } else if (direccion.value.length < 2) {
          document.querySelector(".co_dir").innerHTML = "* Debe tener 2 o más caractéres."
        }else {
          document.querySelector(".co_dir").innerHTML = ""
        }

        if (responsablelegal.value == "") {
          document.querySelector(".co_de").innerHTML = "* Este campo no puede quedar vacío."
        } else if (responsablelegal.value.length < 2) {
          document.querySelector(".co_de").innerHTML = "* Debe tener 2 o más caractéres."
        }else {
          document.querySelector(".co_de").innerHTML = ""
        }

        document.getElementById("progress-seller-details").className = "tab-pane active show";  //No continua

      } else {

        document.querySelector(".co_rs").innerHTML = ""
        document.querySelector(".co_rc").innerHTML = ""
        document.querySelector(".co_dir").innerHTML = ""
        document.querySelector(".co_de").innerHTML = ""
        document.querySelector(".co_em").innerHTML = ""
        document.querySelector(".co_tl").innerHTML = ""

        document.getElementById("progress-seller-details").className = "tab-pane"; //continua
        document.getElementById("porcentajenext").style.width = "100%" //barra al 100%
        document.querySelector(".viewsave").className = "tab-pane viewsave active show";  //Activo la última vista

        document.querySelector(".pre__v").className = "pre__v nav-link";
        document.querySelector(".nex__t").className = "nex__t nav-link active";

      }

    }

    prevTab(){
      document.querySelector(".viewsave").className = "tab-pane viewsave"; //continua
      document.getElementById("progress-seller-details").className = "tab-pane active show"; //continua
      document.getElementById("porcentajenext").style.width = "50%" //barra al 100%

      document.querySelector(".pre__v").className = "pre__v nav-link active";
      document.querySelector(".nex__t").className = "nex__t nav-link";

    }

}
