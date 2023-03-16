import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/model/usuarios';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public pageuser:number
  usuarios:Usuarios= new Usuarios();
  listusers:Usuarios[];
  cadena=[];
  dtTrigger:any= new Subject();
  constructor(public router: Router,private srvModuleService: UsuariosService,private http:HttpClient) { }


  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {

    this.srvModuleService.getUsuarios().subscribe(res=>{
      this.listusers=res;
      let keys= Object.keys(res);

      let i = 0;
      for (let prop of keys ) {
        this.cadena=[],
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log("mi rptaa :",this.cadena)

     },
      )

      this.dtTrigger.next();
  }
  confirmText() {
    Swal.fire(
      'Usuario creado!',
      'has clic para continuar!',
      'success'
    )
    this.router.navigate(['/users'])
  }
  ErrorText(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un Error!',
      footer: '<a href="">Verifica si los Parametros son correctos?</a>'
    })
  }
  crearUsuario():void{
    console.log(this.usuarios)
    this.srvModuleService.create(this.usuarios).subscribe(response =>     
      
    err => {
      this.ErrorText()
      console.log(err.message);
    }, () => {

      console.log('completed');
    })
    this.confirmText();
  }

}
