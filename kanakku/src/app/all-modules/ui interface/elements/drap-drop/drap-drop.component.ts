import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drap-drop',
  templateUrl: './drap-drop.component.html',
  styleUrls: ['./drap-drop.component.css']
})
export class DrapDropComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.jquery("assets/plugins/dragula/js/dragula.min.js")
    this.LoadScript("assets/plugins/dragula/js/drag-drop.min.js")

  }
  jquery(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  LoadScript(js: string) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
}
