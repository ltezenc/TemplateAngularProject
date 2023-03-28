import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/model/usuarios';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

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
  isDtInitialized:boolean = false
  dtElement: DataTableDirective;
  // @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  constructor(public router: Router, private srvModuleService: UsuariosService, private http: HttpClient) { this.loader_general = true; }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
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
      this.tblInicializer();
    })
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
    this.srvModuleService.create(this.usuarios).subscribe(response =>{
      this.getUsers();
      alertifyjs.success('Usuario registrado!');
    },error => alertifyjs.error('Ocurrió '+error.message))

  }
  deleteuser(id,username){
    Swal.fire({
      title: '¿Eliminar a '+username+'?',
      text: "No podrá revertir esta acción!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.srvModuleService.delUsuario(id).subscribe(response =>{
          this.getUsers();
          alertifyjs.success('Usuario ' + username + ' eliminado!');
        },error => alertifyjs.error('Ocurrió un problema al eliminar!'))

      }
    })
  }
  tblInicializer(){
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next(null);
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
