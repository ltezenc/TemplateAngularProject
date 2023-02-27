import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../services/listar-fichero.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
  }
}
