/*import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};*/

// -----------------------------------------------------------------
// ARCHIVO: app.config.ts
// FUNCIÓN: Configuración principal de la aplicación Angular
// -----------------------------------------------------------------

/*import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// provideHttpClient: habilita peticiones HTTP en toda la app

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),     // Habilita las rutas
    provideHttpClient()        // Habilita HttpClient para llamar al backend
  ]
};*/



// -----------------------------------------------------------------
// ARCHIVO: app.config.ts
// FUNCIÓN: Configuración GLOBAL de la aplicación Angular
// IMPORTANCIA: Aquí se habilitan características como rutas y peticiones HTTP
// -----------------------------------------------------------------

// ApplicationConfig: tipo que define la estructura de configuración
import { ApplicationConfig } from '@angular/core';

// provideRouter: función que ACTIVA el sistema de rutas en la app
import { provideRouter } from '@angular/router';

// provideHttpClient: función que ACTIVA las peticiones HTTP (para llamar al backend)
import { provideHttpClient } from '@angular/common/http';

// routes: las rutas definidas en app.routes.ts (login, products, etc)
import { routes } from './app.routes';

// export: hace que esta configuración esté disponible para main.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),   // Habilita navegación por URL
    provideHttpClient()      // Habilita HttpClient para llamar a NestJS
  ]
};