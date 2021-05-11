import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-variable-input',
  templateUrl: './variable-input.component.html',
  styleUrls: ['./variable-input.component.less'],
})
export class VariableInputComponent implements OnInit {
  @ViewChild('tagInput') tagInputRef: ElementRef = new ElementRef('');
  tags: string[] = ['html', 'Angular'];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      tag: [undefined],
    });
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }
}
