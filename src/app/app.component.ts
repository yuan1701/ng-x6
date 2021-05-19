import { Component } from '@angular/core';
import { MyAppService } from './services/my-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'ng-x6-demo';

  constructor(private app: MyAppService) {}

  ngOnInit(): void {
    this.test();
  }

  test() {
    this.app.test();
  }
}
