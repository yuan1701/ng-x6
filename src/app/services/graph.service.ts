import { Injectable } from '@angular/core';
import { Graph, Addon } from '@antv/x6';
import { BehaviorSubject } from 'rxjs';
import './shape';
import './edge';

const { Dnd } = Addon;

interface GraphMapData {
  [key: string]: {
    type: string;
    name: string;
  };
}

const initEdgeAttrs = {
  attrs: {
    line: {
      stroke: '#808080',
      strokeWidth: 1,
      targetMarker: {
        name: 'block',
        args: {
          size: '6',
        },
      },
    },
  },
};
@Injectable({
  providedIn: 'root',
}) // 高亮
export class GraphService {
  graph: any;

  dnd: any;
  // 1.
  expId$ = new BehaviorSubject<string>(''); //临时id

  // 用该方法修改值
  setExpIds(val: string) {
    this.expId$.next(val);
  }

  stencil: any; //模板

  // 保存变量
  graphMapData: GraphMapData = {};

  constructor() {}

  creatGraph(container: any) {
    const that = this;
    // 1.创建画布
    this.graph = new Graph({
      container,
      width: 600,
      height: 400,
      grid: true,
      // 渲染桩
      onPortRendered(args: any) {
        const selectors = args.contentSelectors;
        const container = selectors && selectors.foContent;
        if (container) {
          // container.className = 'my-port';
        }
      },

      // 高亮
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#47C769',
            },
          },
        },
      },
      //判断连线
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-edge',
        connectionPoint: 'boundary',
        createEdge() {
          return that.graph.createEdge(initEdgeAttrs);
        },
        // 点击 magnet 时 根据 validateMagnet 返回值来判断是否新增边
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'in';
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          // 只能从输出链接桩创建连接
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute('port-group') === 'in'
          ) {
            return false;
          }

          // 只能连接到输入链接桩
          if (
            !targetMagnet ||
            targetMagnet.getAttribute('port-group') !== 'in'
          ) {
            return false;
          }

          // 判断目标链接桩是否可连接
          const portId = targetMagnet.getAttribute('port')!;
          const node = targetView && (targetView.cell as any);
          const port = node.getPort(portId);
          if (port && port.connected) {
            return false;
          }

          return true;
        },
      },
    });

    // 2.绘制背景
    this.graph.drawBackground({
      color: '#f5f5f5',
    });

    // 事件1-点击节点
    this.graph.on('node:click', (e: any) => {
      if (1) return;
      this.reset();
      e.node.attr('body/stroke', '#8558ED');
      e.node.attr('body/stroke-width', '2');
      this.setExpIds(e.node.id);
    });

    // 事件2-点击画布
    this.graph.on('blank:click', () => {
      this.reset();
    });

    // 2.创建模板
    this.dnd = new Dnd({
      target: this.graph,
      scaled: false,
      validateNode(droppingNode, options) {
        // 获取目标位置
        const position = droppingNode.position();
        const shape = droppingNode.shape;
        that.addNode({ position, shape });
        return false;
      },
    });

    // 事件3-移入移除
    this.graph.on('cell:mouseenter', (e: any) => {
      if (1) return;
      if (e.cell.isNode()) {
        e.cell.addTools([
          {
            name: 'button-remove',
            args: {
              x: 20,
              y: 0,
              offset: { x: 15, y: 10 },
            },
          },
        ]);
      } else if (e.cell.isEdge()) {
        e.cell.addTools([
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: 10, y: 10 },
            },
          },
        ]);
      } else {
        e.cell.addTools(['vertices', 'segments']);
      }
    });

    this.graph.on('cell:mouseleave', (e: any) => {
      e.cell.removeTools();
    });
  }

  // 3.添加节点
  addNode({
    position: { x = 500, y = 10 },
    shape = 'docker',
    id = '',
    name = '',
    ports = {},
  }) {
    const tempNode = { x, y, shape };
    if (id) {
      Object.assign(tempNode, { id, name, ports });
    }
    const node = this.graph.addNode({
      ...tempNode,
      attrs: {
        title: {
          text: name ? this.handleName(name) : shape,
        },
      },
    });
    const realId = node.id;

    // 添加port指定分组
    // node.addPort({
    //   id: 'port1',
    //   group: 'in',
    // });
    // node.addPort({
    //   id: 'port2',
    //   group: 'out',
    // });
    // node.addPort({
    //   id: 'port-out-1',
    //   group: 'out',
    // });

    this.graphMapData[realId] = {
      name: name || shape,
      type: shape,
    };
  }

  // 4.添加桩
  addPort(id: any, group: 'in' | 'out') {
    const tempNode = this.graph.getCellById(this.expId$.value);
    tempNode.addPort({
      id,
      group,
    });
  }

  // 5.删除指定 ID 的链接桩。
  removePort(portId: string) {
    const tempNode = this.graph.getCellById(this.expId$.value);
    tempNode.removePort('in1');
  }

  // 6.修改名字
  renameNode(newName: string) {
    const id = this.expId$.value;
    if (id) {
      const tempNode = this.graph.getCellById(id);
      tempNode.attr('title/text', this.handleName(newName));
      this.graphMapData[id].name = newName;
    }
  }

  // 7.重置效果
  reset() {
    const nodes = this.graph.getNodes();
    this.setExpIds('');

    nodes.forEach((node: any) => {
      node.attr('body/stroke', '#5F95FF');
    });
  }

  // 8 格式化数据
  formData() {
    const { cells } = this.graph.toJSON();
    const nodes: any = [];
    const edges: any = [];

    cells.forEach((cell: any) => {
      if (cell.shape === 'edge') {
        const { source, target, id } = cell;
        edges.push({ source, target, id });
      } else {
        const { position, shape, ports, id } = cell;
        nodes.push({ ...this.graphMapData[id], position, shape, ports, id });
      }
    });
    return { nodes, edges };
  }

  // 9 保存数据
  saveData() {
    localStorage.setItem('temp', JSON.stringify(this.formData()));
  }

  // 10 初始化数据
  initGraph() {
    const tempStr = localStorage.getItem('temp');
    if (tempStr) {
      const data = JSON.parse(tempStr);

      const { nodes, edges } = data;
      nodes.forEach((node: any) => {
        this.addNode({ ...node });
      });

      edges.forEach((edge: any) => {
        this.graph.addEdge({
          ...edge,
          ...initEdgeAttrs,
        });
      });
    }
  }

  // 处理名称长度
  handleName(name: string) {
    return name.length > 11 ? name.slice(0, 11) + '...' : name;
  }
}
