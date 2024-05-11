import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';

// Define the routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/patient', pathMatch: 'full' }, // Redirect to /patient by default
  { path: 'patient', component: PatientComponent },        // Route to PatientComponent
];

export { appRoutes };
