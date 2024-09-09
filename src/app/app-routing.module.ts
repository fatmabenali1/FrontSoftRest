import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { CongesListComponent } from './conges-list/conges-list.component';
import { CongeFormComponent } from './conge-form/conge-form.component'; // Import CongeFormComponent
import { CalendarComponent } from './calendar/calendar.component'; // Import CalendarComponent

const routes: Routes = [
  { path: '', component: HomeComponent },  // Home route
  { path: 'register', component: RegisterComponent }, // Registration route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'conges-list', component: CongesListComponent }, // List of congés
  { path: 'conge-form', component: CongeFormComponent }, // Form to add a new congé
  { path: 'conge-form/:id', component: CongeFormComponent }, // Form to edit an existing congé by id
  { path: 'ca', component: CalendarComponent }, // Route to CalendarComponent

  { path: '**', redirectTo: '' } // Fallback route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
