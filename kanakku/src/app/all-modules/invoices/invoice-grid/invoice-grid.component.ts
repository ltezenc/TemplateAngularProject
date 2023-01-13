import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-invoice-grid',
  templateUrl: './invoice-grid.component.html',
  styleUrls: ['./invoice-grid.component.css']
})
export class InvoiceGridComponent implements OnInit {
  listclientes:Cliente[];
  cadena=[];
  dtTrigger:any= new Subject();
  constructor(private srvModuleService: AllModulesService,private http:HttpClient) { }

  ngOnInit(): void {
     // Checkbox Select
   this.getCustomers();




	$('.app-listing .selectBox').on("click", function() {
    $(this).parent().find('.checkBoxes').fadeToggle();
    $(this).parent().parent().siblings().find('.checkBoxes').fadeOut();
});

$('.invoices-main-form .selectBox').on("click", function() {
    $(this).parent().find('#checkBoxes-one').fadeToggle();
    $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
});
  }
  ngAfterViewInit() {
    Feather.replace();
    this.dtTrigger.next();
  }

  getCustomers() {

    this.srvModuleService.getCliente().subscribe(res=>{
      this.listclientes=res;
      let keys= Object.keys(res);

      let i = 0;
      for (let prop of keys ) {
        this.cadena=[],
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log(this.cadena)

     },
      )

      this.dtTrigger.next();
  }
}
