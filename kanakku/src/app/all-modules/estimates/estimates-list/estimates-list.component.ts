import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from 'src/app/services/all-modules.service';

@Component({
  selector: 'app-estimates-list',
  templateUrl: './estimates-list.component.html',
  styleUrls: ['./estimates-list.component.css']
})
export class EstimatesListComponent implements OnInit {
  public estimates: any = [];
  errorMessage: any;
  url: any = "estimates";
  public tempId: any;

  constructor(private srvModuleService: AllModulesService) { }

  ngOnInit(): void {
  }



}
