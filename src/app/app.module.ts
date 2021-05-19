import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { PanelComponent } from './graph/panel/panel.component';
import { SenctilComponent } from './graph/senctil/senctil.component';
import { MyAppModule } from './services/my-app.module';
import { VariableInputComponent } from './shared/variable-input/variable-input.component';
import { VariableInput1Component } from './shared/variable-input1/variable-input1.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PanelComponent,
    SenctilComponent,
    VariableInputComponent,
    VariableInput1Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MyAppModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
