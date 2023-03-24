import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/model/usuarios';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuarios = new Usuarios();
  listusers: Usuarios[];
  cadena = [];
  public loader_general: boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  constructor(public router: Router, private srvModuleService: UsuariosService, private http: HttpClient) { this.loader_general = true; }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    }
    this.getUsers();
  }
  getUsers() {
    this.srvModuleService.getUsuarios().subscribe(res => {
      this.loader_general = false;
      this.listusers = res["usuarioResponses"]
      this.dtTrigger.next(0);
    })
  }
  confirmText() {
    Swal.fire(
      'Usuario creado!',
      'has clic para continuar!',
      'success'
    )
    this.router.navigate(['/users'])
  }
  ErrorText() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un Error!',
      footer: '<a href="">Verifica si los Parametros son correctos?</a>'
    })
  }
  crearUsuario(): void {
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
