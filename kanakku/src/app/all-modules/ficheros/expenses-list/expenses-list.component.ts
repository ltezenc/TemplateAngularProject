import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheroListI } from 'src/app/model/ficherolist.interface';
import { Superexcel } from 'src/app/model/superexcel';
import { DataService } from '../../../services/data.service'
import { AllModulesService } from 'src/app/services/all-modules.service';
declare var $:any;
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  expeses: any = [];
  errorMessage: any;
  url: any = "expenses";
  public tempId: any;
  tamaniototal:any;  //Convertido a MB
  FileSelect;
  FileSelectAll = [];
  ficheros:FicheroListI[];
  superexcel:Superexcel[];
   cadena=[];
   cadenase=[];
    Object = Object;
    fileName = "";
    message = "";
    progressInfo = [];
    fileInfos: Observable<any>;
  constructor(public commonService: DataService, public allmodules: AllModulesService) { }

  ngOnInit(): void {
    this.listarFichero()
    this.animaciones()
    this.listarSuperexcel()

  }

  animaciones(){
    //carga de archivos
    $(function() {
      var btn = $(".subir");
      btn.on("click", function() {
        $(this).addClass('btn-progress');
        setTimeout(function() {
          btn.addClass('btn-fill')
        }, 500);

        setTimeout(function() {
          btn.removeClass('btn-fill')
        }, 4100);
        setTimeout(function() {
          btn.addClass('fa-check')
        }, 4400);
        setTimeout(function() {
          btn.removeClass('fa-check')
        }, 5500);
        setTimeout(function() {
          btn.removeClass('btn-progress')
        }, 5700);
      });
    })

  //plugin input
    $("#input-21").fileinput({
      previewFileIconSettings: { // configure your icon file extensions
        'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
        'xls': '<i class="fas fa-file-excel text-success"></i>',
      },
      showPreview: true,
      showUpload: false,
      elErrorContainer: '#kartik-file-errors',
      allowedFileExtensions: ["xls", "xlsx","xlsm"],
     // uploadUrl: 'http://localhost:8080/clienteslibres/documentos/1/1/importar-documentodepulsos'

  });
   }
  listarFichero(){
    this.commonService.getFichero().subscribe(res=>{
      console.log("sacar estado :",res
      )
      this.ficheros=res;
      let keys= Object.keys(res);
      let i = 0;
      for (let prop of keys ) {
        this.cadena=[],
        this.cadena.push(res[prop]);
        this.cadena[i]['name'] = prop;
        i++;
      }
    // console.log(this.cadena)
   })
  }
  listarSuperexcel(){
    this.allmodules.getSuperexcel().subscribe(res=>{
      console.log("sacar estadooooooo :",res
      )
      this.superexcel=res;
      let keys= Object.keys(res);
      let i = 0;
      for (let prop of keys ) {
        this.cadenase=[],
        this.cadenase.push(res[prop]);
        this.cadenase[i]['name'] = prop;
        i++;
      }
    // console.log(this.cadena)
   })
  }

    selectFile(event){
      const[file] = event.target.files;
      let total_registros = event.target.files;
      //Almaceno todo los ficheros
      for (let i = 0; i < total_registros.length; i++) {
        const item = total_registros[i];

        let dataenviar = {
          fileRaw:item,
          fileName:item.name
        }

        this.FileSelectAll.push(dataenviar)

      }
      // console.log(event.target.files.length)
      this.FileSelect={
        fileRaw:file,
        fileName:file.name
      }
      let nombre=this.FileSelect.fileName
      let all_file = this.FileSelectAll
      all_file.forEach(row => {
        let no___mbre=row.fileName
        //enviar el tamaño
        let tamanio =row.fileRaw.size;
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(tamanio, 10) || 0;
        while(n >= 1024 && ++l){
            n = n/1024;
        }
        this.tamaniototal = n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
        // console.log("rpta :",n + ' ' + units[l])
        console.log("rpta :",n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])

        this.commonService.suministroexist(no___mbre).subscribe(res=>console.log(res))
      });

    }

    eliminarFichero(id):void{
      console.log(id)
      this.commonService.delete(id).subscribe(res=>{

        this.listarFichero()},
       err => {
        console.log(err.message);
      }, () => {
        console.log('completed');
      })
    }

    sendFile():void{

      let all_filereg = this.FileSelectAll


      all_filereg.forEach(row_reg => {
        const  body= new FormData();
        body.append('file',row_reg.fileRaw,row_reg.fileName);
        this.commonService.sendPost(body).subscribe(res=>this.listarFichero());
      });

     // body.append('usuario','1')
     // body.append('empresa','1')

    }


    buscarAll(x){
      console.log("VVE#",this.cadena)
      let texto = ""; //Para validar por que campo buscar
      if(x == "nombre")
      {
        let nombre =<HTMLInputElement> document.getElementById('bsq_nombre');
        texto += nombre.value.toLocaleLowerCase()
      }
      else{
        let estado =<HTMLInputElement> document.getElementById('selc_estd');
        texto += estado.value
      }
      let registros = this.cadena[0] //obtengo todo el registro
      let resultado =  <HTMLInputElement> document.querySelector('#resultados_busqueda');
      let html = "";
      let ocultar_tabla =<HTMLInputElement> document.querySelector('#data-table'); //Tabla con registro
      ocultar_tabla.style.display = "none"; //Ocultar Tabla con registro
      let mostrar_tabla =<HTMLInputElement> document.querySelector('#table-data'); //Tabla para mostrar los registros de busqueda
      mostrar_tabla.style.display = "inline-table"; //Mostrar Tabla para  los registros de busqueda
      for(let registro of registros)
      {
        let buscar = "";

        if(x == "nombre")
          {
            buscar += registro.nombre.toLocaleLowerCase();
          }else{
            buscar += registro.estado;
          }
        if(buscar.indexOf(texto) !== -1){ //lo encontró
          let date = new Date(Date.parse(registro.fechaImportacion));
          console.log("encontré :",registro)


            html += `
            <tr>
              <td>${registro.id}</td>
              <td>${registro.nombre}</td>
              <td>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</td>
              <td>${registro.cantLect}</td>
              <td class="text-end" [ngSwitch]="expese.estado" >`



              if(registro.estado == 2){
                html += `
                <span *ngSwitchCase="2"
                class="badge badge-pill bg-danger-light" >Error2</span>

                `
              }else if(registro.estado == 5){
                html += `

                <span *ngSwitchCase="5"
                class="badge badge-pill bg-success-light" >Procesado</span>

                `

              }else if(registro.estado == 4){
                html += `

                <span *ngSwitchCase="4"
                class="badge badge-pill bg-danger-light" >Archivo ya ha sido procesado</span>
                `

              }else if(registro.estado == 3){
                html += `


                <span *ngSwitchCase="3"
                  class="badge badge-pill bg-danger-light" >CLIENTE NO REGISTRADO</span>

                `

              }else if(registro.estado == 1){
                html += `

                <span *ngSwitchCase="1"
                    class="badge badge-pill bg-warning-light"  >Procesando Calculos</span>
                `

              }else{
                html += `
                <span *ngSwitchCase="0"
                      class="badge badge-pill bg-danger-light"  >Pendiente</span>
                `
              }

              html += `

              </td>

              <td class="text-end">
                <a (click)="tempId = expese.id" data-bs-toggle="modal" data-bs-target="#delete_Expenses"
                  href="javascript:void(0);" class="btn btn-sm btn-white text-danger"><i
                    class="far fa-trash-alt me-1"></i>Delete</a>
              </td>
            </tr>


            `
            resultado.innerHTML = html;
        }
        if(texto === ""){
          ocultar_tabla.style.display = "inline-table";
          resultado.innerHTML = "";
          mostrar_tabla.style.display = "none";
        }
      }
    }



    selallchech(){
      let validar =<HTMLInputElement> document.getElementById('principalcheck');
      let btn =<HTMLInputElement> document.getElementById('btndelall');
      if(validar.checked==true){
        btn.style.display="block"
        // <HTMLInputElement>
        let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
        todosinput.forEach(element => {
          console.log(element.checked=true)
        });
      }else{
        btn.style.display="none"
        // <HTMLInputElement>
        let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
        todosinput.forEach(element => {
          console.log(element.checked=false)
        });
      }
    }
    selchech(){
      let btn =<HTMLInputElement> document.getElementById('btndelall');
      btn.style.display="none"
      let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
      todosinput.forEach(element => {
        if(element.checked == true){
          btn.style.display="block"
        }
      });
      // if(btn.checked==true){
      //   btn.style.display="block"
      // }else{
      //   btn.style.display="none"
      // }
    }
    deletesel(){
      let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
      todosinput.forEach(element => {

        //EJECUTAR APIS
        console.log(element.value)



      });

    }


}
