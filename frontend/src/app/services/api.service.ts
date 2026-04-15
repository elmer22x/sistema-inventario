// -----------------------------------------------------------------
// ARCHIVO: api.service.ts
// FUNCIÓN: Comunicarse con el backend NestJS (API REST)
// IMPORTANCIA: Centraliza todas las peticiones HTTP a la base de datos
// -----------------------------------------------------------------

import { Injectable } from '@angular/core';
// Injectable: permite inyectar este servicio en cualquier componente

import { HttpClient } from '@angular/common/http';
// HttpClient: hace peticiones HTTP (GET, POST, PUT, DELETE)

import { Observable } from 'rxjs';
// Observable: maneja respuestas asíncronas de la API

@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la app
})
export class ApiService {
  // URL base del backend (NestJS corre en puerto 3000)
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  // HttpClient se inyecta automáticamente

  // ---------- USUARIOS ----------
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  // GET /users - obtiene todos los usuarios

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }
  // POST /users - crea un nuevo usuario

  // ---------- CATEGORÍAS ----------
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }
  // GET /categories - obtiene todas las categorías

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, category);
  }
  // POST /categories - crea una nueva categoría

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }
  // DELETE /categories/:id - elimina una categoría

  // ---------- PRODUCTOS ----------
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
  // GET /products - obtiene todos los productos

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }
  // POST /products - crea un nuevo producto

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
  // DELETE /products/:id - elimina un producto

  // ---------- INVENTARIO ----------
  getInventory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory`);
  }
  // GET /inventory - obtiene todo el inventario

  updateStock(productId: string, operation: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventory/stock/${productId}`, { operation, quantity });
  }
  // PUT /inventory/stock/:productId - actualiza stock (add/subtract/set)

  getLowStock(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory/low-stock/alerts`);
  }
  // GET /inventory/low-stock/alerts - productos con stock bajo

 // Agregar este método dentro de la clase ApiService (antes del último })

  createInventory(inventory: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/inventory`, inventory);
  }
   // POST /inventory - crea un registro de inventario para un producto



}