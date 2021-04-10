import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less'],
})
export class PanelComponent implements OnInit {
  value = '';
  constructor(public graph: GraphService) {
    this.graph.expId$.subscribe((val) => {
      if (val) {
        const curr = this.graph.graphMapData[val];
        this.value = curr.name;
      }
    });
  }

  ngOnInit(): void {}

  handleRename() {
    this.graph.renameNode(this.value);
  }
}
