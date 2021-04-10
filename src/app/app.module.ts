import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { PanelComponent } from './graph/panel/panel.component';
import { SenctilComponent } from './graph/senctil/senctil.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PanelComponent,
    SenctilComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
