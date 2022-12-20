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
  ficheros:FicheroListI[];
   cadena=[];
    Object = Object;
    fileName = "";
    message = "";
    progressInfo = [];
    fileInfos: Observable<any>;
  constructor(public commonService: DataService) { }

  ngOnInit(): void {
    this.getExpenses();
    this.listarFichero()
  }
  getExpenses() {
    this.expeses = this.commonService.expenses;
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
    console.log(this.cadena)
   })
  }

    selectFile(event){
      const[file] = event.target.files;
      console.log(event.target.files.length)
      this.FileSelect={
        fileRaw:file,
        fileName:file.name
      }
      let nombre=this.FileSelect.fileName
      this.commonService.suministroexist(nombre).subscribe(res=>console.log(res)
      )

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

      const  body= new FormData();
      console.log(this.FileSelect.length)
      body.append('file',this.FileSelect.fileRaw,this.FileSelect.fileName);
      this.commonService.sendPost(body).subscribe(res=>this.listarFichero()
      );
     // body.append('usuario','1')
     // body.append('empresa','1')

    }

}
