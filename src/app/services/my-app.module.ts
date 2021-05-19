import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpInterceptorProviders } from './interceptor';
import { MyAppService } from './my-app.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HttpInterceptorProviders, MyAppService],
})
export class MyAppModule {}
