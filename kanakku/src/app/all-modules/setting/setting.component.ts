import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  [x: string]: any;
  FileSelectAll = [];
  FileSelectAllCMR = [];

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
    $(function() {
      var btn = $(".subircargo");
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
  
    $("#input-pliego").fileinput({
        previewFileIconSettings: { // configure your icon file extensions
          'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
          'xls': '<i class="fas fa-file-excel text-success"></i>',
          'xlsm': '<i class="fas fa-file-excel text-success"></i>',
        },
        showPreview: true,
        showUpload: false,
        elErrorContainer: '#kartik-file-errors',
        allowedFileExtensions: ["xls", "xlsx","xlsm"],      
    });

    $("#input-cargo").fileinput({
      previewFileIconSettings: { // configure your icon file extensions
          'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
          'xls': '<i class="fas fa-file-excel text-success"></i>',
          'xlsm': '<i class="fas fa-file-excel text-success"></i>',
        },
        showPreview: true,
        showUpload: false,
        elErrorContainer: '#kartik-file-errors',
        allowedFileExtensions: ["xls", "xlsx","xlsm"],      
    });
    
   }
   alertCRM(){
   Swal.fire({
    position: 'center-end',
    icon: 'success',
    title: 'ARCHIVO SUBIDO CORRECTAMENTE CMR',
    showConfirmButton: false,
    timer: 1500
  })
}
alertPliego(){
  Swal.fire({
   position: 'center-end',
   icon: 'success',
   title: 'ARCHIVO SUBIDO CORRECTAMENTE PLIEGO TARIFARIO',
   showConfirmButton: false,
   timer: 1500
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
  }
  selectFileCMR(event){
    const[filecmr] = event.target.files;
    let total_registros_cmr = event.target.files;
    //Almaceno todo los ficheros
    for (let i = 0; i < total_registros_cmr.length; i++) {
      const itemcmr = total_registros_cmr[i];

      let dataenviarcmr = {
        fileRaw:itemcmr,
        fileName:itemcmr.name
      }
      this.FileSelectAllCMR.push(dataenviarcmr)
    }
  }
  sendFileCRCM():void{
    let all_filereg = this.FileSelectAllCMR
    all_filereg.forEach(row_reg_cmr => {
      const  bodyCMR= new FormData();
      bodyCMR.append('file',row_reg_cmr.fileRaw,row_reg_cmr.fileName);
      this.commonService.sendPostCRCRM(bodyCMR).subscribe(res=>this.alertCRM());
    });
  }
  sendFilepliegoTarifario():void{
    let all_filereg = this.FileSelectAll
    all_filereg.forEach(row_reg => {
      const  body= new FormData();
      body.append('file',row_reg.fileRaw,row_reg.fileName);
      this.commonService.sendPostPliegoTarifario(body).subscribe(
        res=>this.alertPliego()
        );
      // .subscribe(res=>console.log("ARCHIVO SUBIO CORRECTAMENTE PLIEGO"));
    });
  }

}
