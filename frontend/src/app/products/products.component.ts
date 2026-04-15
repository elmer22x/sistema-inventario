// -----------------------------------------------------------------
// ARCHIVO: products.component.ts
// FUNCIÓN: Mostrar lista de productos, crear nuevos y eliminar
// IMPORTANCIA: CRUD completo de productos
// -----------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Lista de productos que se muestra en la tabla
  products: any[] = [];
  
  // Lista de categorías para el selector del formulario
  categories: any[] = [];
  
  // Objeto para el formulario de nuevo producto
  newProduct: any = {
    name: '',
    description: '',
    price: 0,
    sku: '',
    category_id: ''
  };
  
  // Variables para mensajes
  message: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService) { }

  // ngOnInit: se ejecuta automáticamente cuando el componente se carga
  ngOnInit(): void {
    this.loadProducts();   // Cargar productos
    this.loadCategories(); // Cargar categorías (para el selector)
  }

  // Cargar todos los productos desde el backend
  loadProducts(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  // Cargar todas las categorías para el selector
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

  // Crear un nuevo producto
  createProduct(): void {
    // Validar campos obligatorios
    if (!this.newProduct.name || !this.newProduct.sku || this.newProduct.price <= 0) {
      this.errorMessage = 'Nombre, SKU y precio son obligatorios';
      return;
    }

    this.api.createProduct(this.newProduct).subscribe({
      next: () => {
        this.message = 'Producto creado correctamente';
        this.errorMessage = '';
        // Limpiar formulario
        this.newProduct = { name: '', description: '', price: 0, sku: '', category_id: '' };
        // Recargar la lista
        this.loadProducts();
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => { this.message = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al crear producto';
        setTimeout(() => { this.errorMessage = ''; }, 3000);
      }
    });
  }

  // Eliminar un producto
  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.api.deleteProduct(id).subscribe({
        next: () => {
          this.message = 'Producto eliminado';
          this.loadProducts();
          setTimeout(() => { this.message = ''; }, 3000);
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar producto';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      });
    }
  }
}