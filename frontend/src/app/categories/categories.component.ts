// -----------------------------------------------------------------
// ARCHIVO: categories.component.ts
// FUNCIÓN: Gestionar categorías (crear, listar, eliminar)
// IMPORTANCIA: Las categorías se usan para clasificar productos
// -----------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  // Lista de categorías
  categories: any[] = [];
  
  // Nueva categoría (para el formulario)
  newCategory: any = {
    name: '',
    description: ''
  };
  
  // Mensajes
  message: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Cargar todas las categorías desde el backend
  loadCategories(): void {
    this.api.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }

  // Crear una nueva categoría
  createCategory(): void {
    if (!this.newCategory.name) {
      this.errorMessage = 'El nombre de la categoría es obligatorio';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
      return;
    }

    this.api.createCategory(this.newCategory).subscribe({
      next: () => {
        this.message = 'Categoría creada correctamente';
        this.newCategory = { name: '', description: '' };
        this.loadCategories();
        setTimeout(() => { this.message = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al crear categoría';
        setTimeout(() => { this.errorMessage = ''; }, 3000);
      }
    });
  }

  // Eliminar una categoría
  deleteCategory(id: string): void {
    if (confirm('¿Eliminar esta categoría? Los productos quedarán sin categoría')) {
      this.api.deleteCategory(id).subscribe({
        next: () => {
          this.message = 'Categoría eliminada';
          this.loadCategories();
          setTimeout(() => { this.message = ''; }, 3000);
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar categoría';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      });
    }
  }
}