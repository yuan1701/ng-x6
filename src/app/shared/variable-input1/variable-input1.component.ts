import { Component, OnInit } from '@angular/core';
import { range } from 'lodash';

@Component({
  selector: 'app-variable-input1',
  templateUrl: './variable-input1.component.html',
  styleUrls: ['./variable-input1.component.less'],
})
export class VariableInput1Component implements OnInit {
  inputValue: string = '';

  // 记录光标的位置
  lastRange: any;

  constructor() {}

  ngOnInit(): void {}

  // 需要控制输入参数
  onKeydown(event: KeyboardEvent): void {
    // 1.不支持换行
    if (event.key === 'Enter') {
      event.preventDefault();
      return;
    }
    // 2.调出弹框
    if (event.key === '$') {
      alert(1);
      event.preventDefault();
      return;
    }
    // 3.记录光标的位置
    const selection = getSelection();
    this.lastRange = selection && (selection.getRangeAt(0) as Range);
  }

  onBlur(event: FocusEvent) {
    // this.inputValue = event.target.innerHTML;
    // 记录光标的位置
    const selection = getSelection();
    this.lastRange = selection && selection.getRangeAt(0);
  }

  // 粘贴板
  onPaste(e: ClipboardEvent): void {
    e.preventDefault();
    let paste = e.clipboardData?.getData('text');
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    selection.deleteFromDocument();
    paste && selection.getRangeAt(0).insertNode(document.createTextNode(paste));
  }

  addVar(name: string): void {
    console.log(this.lastRange);
    // 1.获取选定的对象,清楚选中的光标
    const selection = getSelection();
    if (this.lastRange) {
      selection?.removeAllRanges();
      selection?.addRange(this.lastRange);
    }

    // 2.变量位置不能添加变量
    const parentNode = this.lastRange.startContainer.parentNode;
    if (parentNode.className === 'tag-item') {
      return;
    }

    // 3.光标位置插入变量
    var span = document.createElement('span');
    span.innerHTML = '${' + name + '}';
    span.className = 'tag-item';
    span.setAttribute('contenteditable', 'false');
    this.lastRange.insertNode(span);
    this.lastRange.setStart(span, 1);
  }
}
