import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-invoice-grid',
  templateUrl: './invoice-grid.component.html',
  styleUrls: ['./invoice-grid.component.css']
})
export class InvoiceGridComponent implements OnInit {
  public pageht: number
  listclientes: Cliente[];
  public loader_general: boolean;
  cadena = [];
  dtTrigger: any = new Subject();
  constructor(private services: ClienteService, private http: HttpClient) { this.loader_general = true; }

  ngOnInit(): void {
    // Checkbox Select
    this.getCustomers();




    $('.app-listing .selectBox').on("click", function () {
      $(this).parent().find('.checkBoxes').fadeToggle();
      $(this).parent().parent().siblings().find('.checkBoxes').fadeOut();
    });

    $('.invoices-main-form .selectBox').on("click", function () {
      $(this).parent().find('#checkBoxes-one').fadeToggle();
      $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
    });
  }
  ngAfterViewInit() {
    Feather.replace();
    this.dtTrigger.next();
  }

  getCustomers() {

    this.services.getCliente().subscribe(res => {
      this.loader_general = false;
      this.listclientes = res["clienteResponses"];


    },
    )

    this.dtTrigger.next();
  }
}
