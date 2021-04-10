import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: any;
  constructor(public graph: GraphService) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.graph.creatGraph(this.container.nativeElement);
    this.graph.initGraph();
  }

  handleSave() {
    this.graph.saveData();
  }
}
