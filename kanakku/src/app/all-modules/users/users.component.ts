import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/model/usuarios';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public pageuser:number
  usuarios:Usuarios= new Usuarios();
  listusers:Usuarios[];
  public loader_general: boolean;
  cadena=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
 dtElement: DataTableDirective;
 isDtInitialized:boolean = false
  constructor(public router: Router,private srvModuleService: UsuariosService,private http:HttpClient) {   this.loader_general = true;} 


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
      this.tblInicializer();
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
  ErrorText(){
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

  deleteuser(id,username){
    Swal.fire({
      title: '¿Deseas eliminar a '+username+'?',
      text: "No se podrá revertir esta acción!",
      icon: 'warning',
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
}
