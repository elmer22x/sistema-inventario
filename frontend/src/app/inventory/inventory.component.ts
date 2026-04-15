// -----------------------------------------------------------------
// ARCHIVO: inventory.component.ts
// FUNCIÓN: Gestionar stock de productos (ver, aumentar, disminuir)
// IMPORTANCIA: Controla las cantidades disponibles en el almacén
// -----------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // Lista de inventario (cada registro tiene producto + cantidad)
  inventoryList: any[] = [];
  
  // Productos sin inventario (para crear nuevo)
  products: any[] = [];
  
  // Formulario para crear inventario
  newInventory: any = {
    product_id: '',
    quantity: 0,
    min_stock: 5
  };
  
  // Formulario para actualizar stock
  selectedProduct: any = null;
  stockOperation: string = 'add';  // 'add', 'subtract', 'set'
  stockQuantity: number = 0;
  
  // Mensajes
  message: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadInventory();
    this.loadProducts();
  }

  // Cargar inventario actual
  loadInventory(): void {
    this.api.getInventory().subscribe({
      next: (data) => {
        this.inventoryList = data;
      },
      error: (err) => {
        console.error('Error al cargar inventario', err);
      }
    });
  }

  // Cargar productos (para crear inventario de productos nuevos)
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

  // Crear inventario para un producto que no tiene
  createInventory(): void {
    if (!this.newInventory.product_id) {
      this.errorMessage = 'Seleccione un producto';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
      return;
    }

    this.api.createInventory(this.newInventory).subscribe({
      next: () => {
        this.message = 'Inventario creado correctamente';
        this.newInventory = { product_id: '', quantity: 0, min_stock: 5 };
        this.loadInventory();
        setTimeout(() => { this.message = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al crear inventario';
        setTimeout(() => { this.errorMessage = ''; }, 3000);
      }
    });
  }

  // Seleccionar producto para actualizar stock
  selectProductForUpdate(inventory: any): void {
    this.selectedProduct = inventory;
    this.stockOperation = 'add';
    this.stockQuantity = 0;
  }

  // Actualizar stock del producto seleccionado
  updateStock(): void {
    if (!this.selectedProduct || this.stockQuantity <= 0) {
      this.errorMessage = 'Cantidad debe ser mayor a 0';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
      return;
    }

    this.api.updateStock(this.selectedProduct.product_id.id, this.stockOperation, this.stockQuantity).subscribe({
      next: () => {
        this.message = `Stock actualizado (${this.stockOperation}: ${this.stockQuantity})`;
        this.selectedProduct = null;
        this.stockQuantity = 0;
        this.loadInventory();
        setTimeout(() => { this.message = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al actualizar stock';
        setTimeout(() => { this.errorMessage = ''; }, 3000);
      }
    });
  }

  // Cancelar edición
  cancelUpdate(): void {
    this.selectedProduct = null;
    this.stockQuantity = 0;
  }
}