import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c3charts',
  templateUrl: './c3charts.component.html',
  styleUrls: ['./c3charts.component.css']
})
export class C3chartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadscript("assets/plugins/c3-chart/c3.min.js")
    this.loadc3script("assets/plugins/c3-chart/d3.v5.min.js")
    this.Loadminjs("assets/plugins/c3-chart/chart-data.js")
   

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
  loadc3script(js: string){
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }

}
