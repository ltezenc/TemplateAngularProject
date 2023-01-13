import { Component, OnInit } from '@angular/core';
import { CerrarprocesoService } from 'src/app/services/cerrarproceso.service';

@Component({
  selector: 'app-close-process',
  templateUrl: './close-process.component.html',
  styleUrls: ['./close-process.component.css']
})
export class CloseProcessComponent implements OnInit {

  constructor(private close:CerrarprocesoService) { }

  ngOnInit(): void {
  }

  cerrarproceso(){
    this.close.cerrarproceso().subscribe(response => {
         //do something with response
       }, err => {
         console.log(err.message);
       }, () => {
         console.log('completed');
    }) 

  }
}
