import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes'; // Corrected import


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};
