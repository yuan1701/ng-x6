import { Graph } from '@antv/x6';

// 定义边
Graph.registerConnector(
  'algo-edge',
  (source, target) => {
    const offset = 4;
    const control = 80;
    const v1 = { x: source.x, y: source.y + offset + control };
    const v2 = { x: target.x, y: target.y - offset - control };

    return `M ${source.x} ${source.y}
         L ${source.x} ${source.y + offset}
         C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
         L ${target.x} ${target.y}
        `;
  },
  true
);
