

// -----------------------------------------------------------------
// ARCHIVO: app.ts
// FUNCIÓN: Lógica del componente principal (el "cerebro" de app.html)
// IMPORTANCIA: Es el primer componente que se carga al iniciar la app
// -----------------------------------------------------------------

// Component: decorador que convierte una clase en un componente de Angular
// RouterOutlet: directiva que permite usar <router-outlet> en el HTML
// RouterLink: directiva que permite usar routerLink en los enlaces
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

// @Component: le dice a Angular cómo comportarse y qué archivos usar
@Component({
  selector: 'app-root',        // Nombre de la etiqueta HTML: <app-root></app-root>
  standalone: true,            // No necesita un NgModule aparte
  imports: [RouterOutlet, RouterLink], // Componentes/directivas que usa este componente
  templateUrl: './app.html',   // Archivo HTML que usa como plantilla
  styleUrls: ['./app.css']     // Archivo CSS exclusivo para este componente
})
export class App {
  // title: variable pública que podría usarse en app.html (aunque no la usamos)
  title = 'sistema-inventario-frontend';
}