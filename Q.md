[TOC]

# ng-x6

个人总结antv/x6的使用：

```javascript
// 安装
npm install @antv/x6 --save
// 导入
import { Graph } from '@antv/x6';
```

1.创建容器
<div #container></div>

渲染画布
const graph = new Graph({
  container: document.getElementById('container'),
  width: 800,
  height: 600,
});

判断是否可以连线

连线和吸附效果都没有了？

实现一个连多个，和多个出口连接一个入口？？

连接过的高亮效果没有了？



如何动态添加链接桩

添加删除工具
使用addTools，

删除节点

删除连线

自定义节点
1.继承-配置-注册

自定义边

添加删除工具

文本如何居中？？？


拖拽结束的动画效果animation设置false，或者不加，默认就是false

自定义桩-定制桩
如何动态添加链接桩
桩位置,这里只需要两个桩分组in和out，但是上下分组可能会有多个port，所以定位上选择line，
ports: {
  groups: {
    in: {
      position: {
        name: 'line',
        args: {
          start: { x: 0, y: -10 },
          end: { x: 180, y: -10 },
        },
      },
      label: {
        position: 'top',
      },
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
  }
}
添加桩 addPort({group:'in',id:'port1'})

桩的显示已隐藏，这儿不涉及，可查看 https://x6.antv.vision/zh/examples/interaction/port#visible
现在节点和桩已经建好了，接下来开始连线


判断是否可以连线
使用connecting判断是否可以连接，
添加连线
graph.addEdge({
  source: { x: 40, y: 100 },
  target: {
    cell: rect,
    port: 'port3', // 链接桩 ID
  },
  attrs:{

  }
})




1.配置邮箱
$ git config --global user.name "yuan1701"
$ git config --global user.email '1349281070@qq.com'
2.生成ssh
ssh-keygen -t rsa -C "1349281070@qq.com"