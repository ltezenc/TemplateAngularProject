import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peitycharts',
  templateUrl: './peitycharts.component.html',
  styleUrls: ['./peitycharts.component.css']
})
export class PeitychartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.Loadminjs("assets/plugins/peity/jquery.peity.min.js")
    this.loadscript("assets/plugins/peity/chart-data.js")
  }
  loadscript(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  Loadminjs(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
}
