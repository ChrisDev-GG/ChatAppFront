import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Para el servicio HTTP
import { routes } from './app.routes';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Proveedor de HttpClientModule
  ],
};
