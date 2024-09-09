import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CongesListComponent } from './conges-list/conges-list.component';
import { CongeFormComponent } from './conge-form/conge-form.component';
import { CalendarComponent } from './calendar/calendar.component'; // Import CalendarComponent
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CongesListComponent,
    CongeFormComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
