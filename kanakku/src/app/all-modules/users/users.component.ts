import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/model/usuarios';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as alertifyjs from 'alertifyjs';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public pageuser: number
  usuarios: Usuarios = new Usuarios();
  listusers: Usuarios[];
  public loader_general: boolean;
  public load_er: boolean = false;
  cadena = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false
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
      console.log("users :",res["usuarioResponses"])
      this.tblInicializer();
    },error => alertifyjs.error('¡Ocurrió un '+error.status+'!'))
  }
  crearUsuario(): void {
    this.srvModuleService.create(this.usuarios).subscribe(response => {
      this.getUsers();
      alertifyjs.success('Usuario registrado!');
      $("#bs-example-modal-sm").modal("hide")
      $("#formRegistrarUsuario").trigger("reset");
    }, error => alertifyjs.error('Ocurrió ' + error.message))

  }
  tblInicializer() {
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
  deleteuser(id, username) {
    Swal.fire({
      title: '¿Deseas eliminar a ' + username + '?',
      text: "No se podrá revertir esta acción!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_er = true;
        this.srvModuleService.delUsuario(id).subscribe(response => {
          this.load_er = false;
          this.getUsers();
          alertifyjs.success('Usuario ' + username + ' eliminado!');
        }, error => {
          this.load_er = false;
          alertifyjs.error('Ocurrió un error '+error.status+' al eliminar!')
        })
      }
    })
  }
}
