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
  onKeyUp(event: KeyboardEvent): void {
    console.log(event.key);
    if (event.key === '$') {
      console.log(this.inputValue);
    } else {
      const reg = new RegExp('^[a-zA-Z0-9]{1,1}$');
      if (reg.test(event.key)) {
        console.log(event.key);
      }
    }
    // 记录光标的位置
    const selection = getSelection();
    this.lastRange = selection && selection.getRangeAt(0);
    console.log(this.lastRange);
  }

  onBlur(event: any) {
    this.inputValue = event.target.innerHTML;
    // 记录光标的位置
    const selection = getSelection();
    this.lastRange = selection && selection.getRangeAt(0);
  }

  addVar() {
    console.log(this.lastRange);

    if (0 || this.lastRange) {
      // 2.光标位置插入变量？插入位置不对
      var span = document.createElement('span');
      span.innerHTML = '${name}';
      span.className = 'tag-item';
      span.setAttribute('contenteditable', 'false');
      this.lastRange.insertNode(span);
      this.lastRange.setStart(span, 1);
    }
  }
}
