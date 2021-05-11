import { Graph } from '@antv/x6';

Graph.registerNode(
  'custom-node',
  {
    inherit: 'circle',
    width: 50,
    height: 50,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
      },
      image: {
        'xlink:href': 'http://composer.cloudtogo.cn/icon-keji1.svg',
        width: 30,
        height: 30,
        x: 10,
        y: 10,
      },
      title: {
        text: 'Node',
        refX: '50%', // 距离左侧距离
        refY: 60,
        fill: 'rgba(0,0,0,0.85)',
        fontSize: 14,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        // 控制文本长度
        textWrap: {
          width: -10,
          height: '50%', // 高度为参照元素高度的一半
          ellipsis: true, // 文本超出显示范围时，自动添加省略号
          breakWord: true, // 是否截断单词
        },
      },
    },
    // 节点/边的 SVG/HTML 片段
    markup: [
      {
        tagName: 'circle',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'image',
      },
      {
        tagName: 'text',
        selector: 'title',
      },
      {
        tagName: 'text',
        selector: 'text',
      },
    ],
    // portMarkup: [Markup.getForeignObjectMarkup()],
    ports: {
      items: [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
      ],
      groups: {
        in: {
          position: {
            name: 'line',
            args: {
              start: { x: 0, y: -10 },
              end: { x: 50, y: -10 },
            },
          },

          attrs: {
            circle: {
              r: 4,
              stroke: '#27a4ff',
              magnet: true,
              fill: '#27a4ff',
            },
          },
        },
        out: {
          position: {
            name: 'line',
            args: {
              start: { x: 0, y: 80 },
              end: { x: 50, y: 80 },
            },
          },
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#27a4ff',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      },
    },
  },
  true
);

Graph.registerNode(
  'redis',
  {
    inherit: 'custom-node',
    attrs: {
      image: {
        'xlink:href': 'http://mart.cloudtogo.cn/api/mart/img/logo/43.jpg',
      },
      title: {
        text: 'redis',
      },
    },
  },
  true
);

Graph.registerNode(
  'sql',
  {
    inherit: 'custom-node',
    attrs: {
      image: {
        'xlink:href': 'http://composer.cloudtogo.cn/icon-db.svg',
      },
      title: {
        text: 'sql',
      },
    },
  },
  true
);

// Graph.registerNode(
//   'docker',
//   {
//     inherit: 'custom-node',
//     attrs: {
//       image: {
//         'xlink:href': 'http://composer.cloudtogo.cn/icon-docker.svg',
//       },
//       title: {
//         text: 'docker',
//       },
//     },
//   },
//   true
// );

Graph.registerNode(
  'docker',
  {
    inherit: 'html',
    width: 100,
    height: 100,

    html() {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
      <div  class="my-btn">
      <img
        width="30px"
        height="30px"
        class="icon"
        src="http://composer.cloudtogo.cn/icon-docker.svg"
      />
      <span>docker</span>
    </div>`;
      return wrap;
    },
    ports: {
      items: [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
      ],
      groups: {
        in: {
          position: {
            name: 'line',
            args: {
              start: { x: 0, y: -10 },
              end: { x: 50, y: -10 },
            },
          },

          attrs: {
            circle: {
              r: 4,
              stroke: '#27a4ff',
              magnet: true,
              fill: '#27a4ff',
            },
          },
        },
        out: {
          position: {
            name: 'line',
            args: {
              start: { x: 0, y: 80 },
              end: { x: 50, y: 80 },
            },
          },
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#27a4ff',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      },
    },
  },
  true
);
