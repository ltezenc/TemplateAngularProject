import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clipboards',
  templateUrl: './clipboards.component.html',
  styleUrls: ['./clipboards.component.css']
})
export class ClipboardsComponent implements OnInit {

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  cutInputMessage(inputElement){
    inputElement.select();
    document.execCommand('cut');
    inputElement.setSelectionRange(0, 0);
  }
  
  // copyMessage(val: string){
  //   const selBox = document.createElement('textarea');
  //   selBox.style.position = 'fixed';
  //   selBox.style.left = '0';
  //   selBox.style.top = '0';
  //   selBox.style.opacity = '0';
  //   selBox.value = val;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(selBox);
  // }

  
  constructor() { }

  ngOnInit(): void {
  }

}
