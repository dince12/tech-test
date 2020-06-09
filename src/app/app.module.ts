import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterPipe } from './pipe/filter.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AddModalComponent } from './modals/add-modal/add-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    AddModalComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ AddModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
