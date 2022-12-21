import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheroListI } from 'src/app/model/ficherolist.interface';
import { DataService } from '../../../services/data.service'

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
        this.commonService.suministroexist(no___mbre).subscribe(res=>console.log(res))
      });

    }

    eliminarFichero(documen:FicheroListI):void{
      console.log(documen.id)
      this.commonService.delete(documen.id).subscribe(res=>{

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
