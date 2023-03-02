import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheroListI } from 'src/app/model/ficherolist.interface';
import { Superexcel } from 'src/app/model/superexcel';
import { DataService } from '../../../services/data.service'
declare var $:any;
@Component({
  selector: 'app-expenses-list',
  templateUrl: './lista-ficheros.component.html',
  styleUrls: ['./lista-ficheros.component.css']
})
export class listaFicherosComponent implements OnInit {
  public tempId: any;
  public page:number;
  tamaniototal:any;  //Convertido a MB
  FileSelect;
  FileSelectAll = [];
  superexcel:Superexcel[];
  ficheros:FicheroListI[];
   cadena=[];
   cadenase=[];
   estadosuperexcel:number;
    fileName = "";
    message = "";
    progressInfo = [];
    fileInfos: Observable<any>;
  constructor(public commonService: DataService) { }

  ngOnInit(): void {
    this.listarSuperexcel()
    this.listarFichero()
    this.animaciones()
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
        }, 5100);
        setTimeout(function() {
          btn.addClass('fa-check')
        }, 5400);
        setTimeout(function() {
          btn.removeClass('fa-check')
        }, 6500);
        setTimeout(function() {
          btn.removeClass('btn-progress')
        }, 6700);
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

   listarSuperexcel(){
    this.commonService.getSuperexcel().subscribe(res=>{
      console.log(res )
      this.superexcel=res;
      let keys= Object.keys(res);
      let i = 0;
      for (let prop of keys ) {
        this.cadenase=[],
        this.cadenase.push(res[prop]);
        this.cadenase[i]['name'] = prop;
        i++;
      }

   })
   setTimeout(this.refresh, 13000);
  }
  listarFichero(){
  // let refrest= setInterval(() => {
      this.commonService.getFichero().subscribe(res=>{
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
   //   }, 15000);


  }
     refresh(){

    this.commonService.getSuperexcel().subscribe(res=>{
      let keys= Object.keys(res);
      let i = 0;
      for (let prop of keys ) {
        this.cadenase=[],
        this.cadenase.push(res[prop]);
        this.cadenase[i]['name'] = prop;
        i++;
      }
      this.estadosuperexcel = res["superexcelListResponse"][0]["estado"]
      let interval = setInterval(this.listarFichero,15000)
 if(this.estadosuperexcel==9){
  clearInterval(interval);
 }
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
        this.commonService.suministroexist(no___mbre).subscribe(res=>console.log(res))
      });

    }

    eliminarFichero(el):void{

      /*Creo un atributo en ambos buttons donde almaceno el id
        Sólo que al buscar si lo almacena pero en el otro lo trae como vacío
        Por eso es que valido */
      let cls =<HTMLInputElement> document.querySelector('.getattr_id');
      let obtengoid = cls.getAttribute('attr_id')
      let id_add

      if(obtengoid != ""){
        id_add =Number(obtengoid) //Buscando
      }else{
        id_add =el  //Sin buscar
      }

      this.commonService.delete(id_add).subscribe(res=>{

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
        this.commonService.sendPost(body).subscribe(res=>this.listarSuperexcel());
      });

/*
      let all_filereg = this.FileSelectAll

      all_filereg.forEach(row_reg => {
      let tamanio =row_reg.fileRaw.size;
      console.log("all_filereg :",tamanio)

      if(tamanio > 2000000){
        document.querySelector(".msm_alert").innerHTML = "API I"
      }else{
        document.querySelector(".msm_alert").innerHTML = "API II"
      }

        // const  body= new FormData();
        // body.append('file',row_reg.fileRaw,row_reg.fileName);
        // this.commonService.sendPost(body).subscribe(res=>this.listarFichero());
      });

     // body.append('usuario','1')
     // body.append('empresa','1')
*/
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
                <a data-bs-toggle="modal" data-bs-target="#delete_Expenses" attr_id="${registro.id}"
                  href="javascript:void(0);" class="btn btn-sm btn-white text-danger getattr_id"><i
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

        if(element.checked == true){
          //EJECUTAR APIS
          console.log(element.value)

        }




      });

    }


}
