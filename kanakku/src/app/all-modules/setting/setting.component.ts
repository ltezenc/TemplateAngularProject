import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $:any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  [x: string]: any;
  FileSelectAll = [];

  constructor(public commonService: DataService) { }

  ngOnInit(): void {
    this.animaciones()
  }

  animaciones(){
    //carga de pliego
    $(function() {
      var btn = $(".subirpliego");
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
  
    $("#input-pliego[]").fileinput({
        previewFileIconSettings: { // configure your icon file extensions
          'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
          'xls': '<i class="fas fa-file-excel text-success"></i>',
        },
        showPreview: true,
        showUpload: false,
        elErrorContainer: '#kartik-file-errors',
        allowedFileExtensions: ["xls", "xlsx","xlsm"],      
    });
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
  sendFileCRCM():void{
    let all_filereg = this.FileSelectAll
    all_filereg.forEach(row_reg => {
      const  body= new FormData();
      body.append('file',row_reg.fileRaw,row_reg.fileName);
      this.commonService.sendPostCRCRM(body).subscribe(res=>console.log("ARCHIVO SUBIO CORRECTAMENTE"));
    });
  }

}
