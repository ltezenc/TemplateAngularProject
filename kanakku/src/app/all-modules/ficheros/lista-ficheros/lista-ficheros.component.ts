import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheroListI } from 'src/app/model/ficherolist.interface';
import { Superexcel } from 'src/app/model/superexcel';
import Swal from 'sweetalert2';
import { DataService } from '../../../services/data.service'
import * as alertifyjs from 'alertifyjs';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-expenses-list',
  templateUrl: './lista-ficheros.component.html',
  styleUrls: ['./lista-ficheros.component.css']
})
export class listaFicherosComponent implements OnInit, OnDestroy {
  public tempId: any;
  public load_er: boolean;
  public loader_general: boolean;
  tamaniototal: any; //Convertido a MB
  FileSelect;
  FileSelectAll = [];
  superexcel: Superexcel[];
  ficheros: FicheroListI[];
  ficherosOriginal: FicheroListI[];
  eliminado: FicheroListI = new FicheroListI()
  cadena = [];
  estadosuperexcel: number;
  fileName = "";
  message = "";
  progressInfo = [];
  fileInfos: Observable<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(public commonService: DataService) { this.load_er = false; this.loader_general=true; }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    }
    this.listarSuperexcel()
    this.listarFichero()
    this.animaciones()
  }
  animaciones() {
    //carga de archivos
    $(function () {
      var btn = $(".subir");
      btn.on("click", function () {
        $(this).addClass('btn-progress');
        setTimeout(function () {
          btn.addClass('btn-fill')
        }, 500);
        setTimeout(function () {
          btn.removeClass('btn-fill')
        }, 5100);
        setTimeout(function () {
          btn.addClass('fa-check')
        }, 5400);
        setTimeout(function () {
          btn.removeClass('fa-check')
        }, 6500);
        setTimeout(function () {
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
      allowedFileExtensions: ["xls", "xlsx", "xlsm"],
      // uploadUrl: 'http://localhost:8080/clienteslibres/documentos/1/1/importar-documentodepulsos'

    });
  }
  listarSuperexcel() {
    .0
    this.commonService.getSuperexcel().subscribe(res => {
      this.superexcel = res["superexcelListResponse"];
    })
  }
  listarFichero() {
    this.commonService.getFichero().subscribe(res => {
      this.loader_general = false;
      this.ficheros = res["documentosByUsuarioIdAndEmpresaIdResponse"];
      this.ficherosOriginal = res["documentosByUsuarioIdAndEmpresaIdResponse"];
      this.dtTrigger.next(null);
    })
  }
  refresh() {
    let times = 0
    const intervalID = setInterval(() => {
      this.listarSuperexcel();
      this.listarFichero();
      console.log('analizando')
      times++
      if (times > 18) {
        console.log('finalizo')
        clearInterval(intervalID)
      }
    }, 16000)
  }
  confirmText() {
    Swal.fire(
      'Fichero Eliminado!',
      'has clic para continuar!',
      'success'
    )
  }
  selectFile(event) {
    const [file] = event.target.files;
    let total_registros = event.target.files;
    //Almaceno todo los ficheros
    for (let i = 0; i < total_registros.length; i++) {
      const item = total_registros[i];
      let dataenviar = {
        fileRaw: item,
        fileName: item.name
      }
      this.FileSelectAll.push(dataenviar)
    }
    this.FileSelect = {
      fileRaw: file,
      fileName: file.name
    }
    let nombre = this.FileSelect.fileName
    let all_file = this.FileSelectAll
    all_file.forEach(row => {
      let no___mbre = row.fileName
      this.commonService.suministroexist(no___mbre).subscribe(res => console.log(res))
    });

  }
  eliminarFichero(el): void {
    this.load_er = true;
    this.eliminado.id = el;
    this.commonService.delete(this.eliminado).subscribe(res => {
      this.load_er = false;
      alertifyjs.success('Fichero ' + el + ' eliminado!');
      this.listarFichero()
      this.rerender();
    }, error => alertifyjs.error('Ocurrió un problema!'))
  }
  sendFile(): void {
    let all_filereg = this.FileSelectAll
    all_filereg.forEach(row_reg => {
      const body = new FormData();
      body.append('file', row_reg.fileRaw, row_reg.fileName);
      this.commonService.sendPost(body).subscribe(res => {
        this.listarSuperexcel();
        console.log('ya subio')
        this.refresh();
      });
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
  //Seleccionar para eliminar todo
  selallchech() {
    let validar = <HTMLInputElement>document.getElementById('principalcheck');
    let btn = <HTMLInputElement>document.getElementById('btndelall');
    if (validar.checked == true) {
      btn.style.display = "block"
      let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
      todosinput.forEach(element => {
        element.checked = true
      });
    } else {
      btn.style.display = "none"
      let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
      todosinput.forEach(element => {
        element.checked = false
      });
    }
  }
  //Seleccionar uno por uno
  selchech() {
    let btn = <HTMLInputElement>document.getElementById('btndelall');
    btn.style.display = "none"
    let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
    todosinput.forEach(element => {
      if (element.checked == true) {
        btn.style.display = "block"
      }
    });
  }
  //Eliminar lo seleccionado
  deletesel() {
    let todosinput = document.querySelectorAll<HTMLInputElement>('.checkall');
    Swal.fire({
      icon: 'question',
      title: '¿Eliminar Ficheros?',
      text: 'No podrás revertir esta acción',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6E7881',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_er = true;
        todosinput.forEach(element => {
          if (element.checked == true) {
            this.eliminado.id = Number(element.value);
            this.commonService.delete(this.eliminado).subscribe(res => {
              this.listarFichero()
              this.load_er = false;
              alertifyjs.success('Fichero ' + Number(element.value) + ' eliminado!');
            }, error => alertifyjs.error('Ocurrió un problema!'))
          }
        });
        // let btn = <HTMLInputElement>document.getElementById('btndelall');
        // btn.style.display = "none"
        this.rerender();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
