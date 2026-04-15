// -----------------------------------------------------------------
// ARCHIVO: login.component.ts
// FUNCIÓN: Lógica de la pantalla de inicio de sesión
// IMPORTANCIA: Valida usuario y redirige al dashboard
// -----------------------------------------------------------------

import { Component } from '@angular/core';
import { Router } from '@angular/router';        // Para navegar entre páginas
import { FormsModule } from '@angular/forms';   // Para usar [(ngModel)] en formularios
import { CommonModule } from '@angular/common'; // Para directivas como ngIf

@Component({
  selector: 'app-login',           // Etiqueta HTML: <app-login></app-login>
  standalone: true,                // No necesita NgModule
  imports: [FormsModule, CommonModule], // Módulos necesarios para el formulario
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variables que se enlazan con el formulario HTML
  email: string = '';     // Almacena lo que escribe el usuario en el campo email
  password: string = '';  // Almacena lo que escribe en el campo contraseña

  // Router: se inyecta automáticamente para poder navegar
  constructor(private router: Router) { }

  // onSubmit: se ejecuta cuando el usuario hace clic en "Ingresar"
  onSubmit() {
    // Validación simple: si ambos campos tienen algo
    if (this.email && this.password) {
      // localStorage: guarda datos en el navegador (persisten al recargar)
      // Guarda el email del usuario para saber quién está logueado
      localStorage.setItem('user', this.email);
      
      // router.navigate: cambia la URL a /products (página de productos)
      this.router.navigate(['/products']);
    }
  }
}