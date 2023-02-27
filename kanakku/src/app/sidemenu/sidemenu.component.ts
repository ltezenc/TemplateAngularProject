import { Component,  OnInit  } from '@angular/core';
import { Event, Router,  NavigationEnd } from '@angular/router';
import { WebStorage } from '../core/storage/web.storage';
import { ClienteService } from '../services/cliente.service';
import { UsuariosService } from '../services/usuarios.service';
declare var $: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  public langCollapsed = true;

  splitVal:any
  base = '';
  page = '';
  nombre=[];
  validaruser:any;
  pass:any;
  username:any;
  rptavalid:any;
  datapass:any;
  iduser:any;

  constructor(
    public lg:UsuariosService,
    public service:ClienteService,
    public router: Router,
    private storage: WebStorage
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];

      }
    });

  }
  
  ngOnInit(): void {
    $(document).on('click', '#filter_search', function() {
      $('#filter_inputs').slideToggle("slow");
    });
    $(document).on('mouseover', function(e:any) {
      e.stopPropagation();
      if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
          var targ = $(e.target).closest('.sidebar').length;
          if(targ) {
              $('body').addClass('expand-menu');
              $('.subdrop + ul').slideDown();
          } else {
              $('body').removeClass('expand-menu');
              $('.subdrop + ul').slideUp();
          }
          return false;
      }
  });

  let user=localStorage.getItem("usuario");
  
  this.nombreusuario(user)
  }


  nombreusuario(user){  
    this.storage.NombrebyLogin(user).subscribe(data=>{
      let keys= Object.keys(data);
      let i = 0;
      for (let prop of keys ) {
        this.nombre=[],
        this.nombre.push(data[prop]);
        this.nombre[i]['name'] = prop;
        i++;
        localStorage.setItem("idusuario",this.nombre[0][0]['id'])
        
      }
    })
   
  }
  ngAfterViewInit() {
    this.loadDynmicallyScript('./../../../assets/js/script.js');
  }
  loadDynmicallyScript(js:any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name:any) {
    this.page = name;
    // this.commonService.nextmessage('admin');
  }
  home() {
    // this.router.navigate(['/index']);
    window.location.href = '/index';
  }

  main() {
    // this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/index';
  }
  burgerMenu() {
    if($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    return false;
  }

  Logout(){
    localStorage.removeItem('LoginData')
    this.router.navigate(["/login-form"]);
  }
  fn_shear(suministro){  //Con esta función nos permitirá buscar en dos formas (Escribiendo y con click)

    var URLactual = window.location;
    if(suministro != ""){

      document.getElementById("show_rpta").style.display = 'block'
      document.getElementById("rpta__a").innerHTML = `
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status"></div>
      </div>`
      let html = "";
      this.service.getBuscarHistoricoSuministro(suministro).subscribe(res=>{
          let validar_rpta = res["buscarHistoricoResponses"].length;
          if(validar_rpta !=0){
            res["buscarHistoricoResponses"].forEach(it__em => {
              html += `<a href="${URLactual.origin}/historio-customers?id=${it__em.suministro}"><span>${it__em.razonSocial} - ${it__em.suministro}</span></a> <hr>`
              document.getElementById("rpta__a").innerHTML = html
            });
          }else{
            document.getElementById("rpta__a").innerHTML = `No se encontró resultados`
          }


        },
      )


    }else{
      document.getElementById("show_rpta").style.display = 'none'
      console.log("campo vacío")
    }

  }
  onKeyUp(x) { // appending the updated value to the variable
    let suministro = x.target.value;
    this.fn_shear(suministro)
  }

  buscarSum(){
    let input = <HTMLInputElement> document.querySelector('#buscarsumn');
    this.fn_shear(input.value)
  }
  updatepass(){
    let old_pass =<HTMLInputElement> document.getElementById('pass_old');
    let btn = <HTMLInputElement> document.querySelector('.btnupdatepass');
    let msm = <HTMLInputElement> document.querySelector('.msm__pss');
    let new_pass =<HTMLInputElement> document.getElementById('new_old');
    btn.disabled = true;
    btn.innerHTML = `Guardando... <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>`

    this.validaruser =
      {
          "usuarioLogin": this.username,
          "password": old_pass.value
    }

        this.lg.validusers(this.validaruser).subscribe(response => {
          // this.ErrorText()

          if(response){
            document.querySelector("#msm_pass").innerHTML = ""

              this.datapass =
                {
                    "usuarioId": this.iduser,
                    "password": new_pass.value
              }

              this.lg.updatepass(this.datapass).subscribe(response => {
                // this.ErrorText()

                msm.style.display = "block";
                btn.innerHTML = `Guardar`
                btn.disabled = false;

                old_pass.value="";
                new_pass.value="";
              }, () => {
                console.log(this.datapass);
              })
          }else{
            btn.innerHTML = `Guardar`
            btn.disabled = false;
            document.querySelector("#msm_pass").innerHTML = "La contraseña ingresada no coincide con la actual."

            old_pass.value="";
            new_pass.value="";
          }


        }, () => {
          console.log("error :",this.validaruser);
        })





  }
}