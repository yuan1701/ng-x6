import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-senctil',
  templateUrl: './senctil.component.html',
  styleUrls: ['./senctil.component.less'],
})
export class SenctilComponent implements OnInit {
  constructor(public graph: GraphService) {}

  ngOnInit(): void {}

  startDrag = (e: any) => {
    const target = e.currentTarget;
    const type = target.getAttribute('data-type');

    const node = this.graph.graph.createNode({
      shape: type,
    });

    this.graph.dnd.start(node, e as any);
  };
}
