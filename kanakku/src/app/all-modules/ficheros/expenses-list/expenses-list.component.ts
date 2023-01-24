import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheroListI } from 'src/app/model/ficherolist.interface';
import { DataService } from '../../../services/data.service'
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
   cadena=[];
    Object = Object;
    fileName = "";
    message = "";
    progressInfo = [];
    fileInfos: Observable<any>;
  constructor(public commonService: DataService) { }

  ngOnInit(): void {
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



}
