import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// -------------------------------------- //

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { AdminComponent } from './components/admin/admin.component';
import { RequestComponent } from './components/request/request.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';

import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
