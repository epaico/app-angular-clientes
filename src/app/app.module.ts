import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {appRoutes} from "./app.routes";
import { ClienteIndexComponent } from './components/cliente/cliente-index/cliente-index.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ClienteIndexComponent,
    NavbarComponent,
    ClienteFormComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
