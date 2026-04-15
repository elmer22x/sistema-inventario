// -----------------------------------------------------------------
// ARCHIVO: register.component.ts
// FUNCIÓN: Lógica de la pantalla de registro de nuevos usuarios
// IMPORTANCIA: Crea usuarios en el backend (POST a /users)
// -----------------------------------------------------------------

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';  // Servicio para llamar al backend

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Variables del formulario
  name: string = '';
  email: string = '';
  password: string = '';
  
  // Variables para mostrar mensajes al usuario
  message: string = '';
  errorMessage: string = '';

  // Inyecta Router (para navegar) y ApiService (para llamar al backend)
  constructor(private router: Router, private api: ApiService) { }

  onSubmit() {
    // Limpiar mensajes anteriores
    this.message = '';
    this.errorMessage = '';
    
    // Crear objeto con los datos del usuario
    const userData = {
      name: this.name,
      email: this.email,
      password_hash: this.password  // backend espera "password_hash"
    };
    
    // Llamar al backend: POST /users
    this.api.createUser(userData).subscribe({
      next: (response) => {
        // Éxito: usuario creado
        this.message = 'Usuario creado correctamente. Redirigiendo...';
        
        // Esperar 2 segundos y redirigir al login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        // Error: mostrar mensaje
        this.errorMessage = error.error?.message || 'Error al crear usuario';
      }
    });
  }
}