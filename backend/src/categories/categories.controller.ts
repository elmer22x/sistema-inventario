// -----------------------------------------------------------------
// ARCHIVO: categories.controller.ts
// FUNCIÓN: Maneja las PETICIONES HTTP (rutas API) relacionadas con categorías
// IMPORTANCIA: Es la "puerta de entrada" - recibe peticiones del cliente (Postman, Angular)
// CONEXIONES: Recibe datos, los valida (opcional) y llama al CategoriesService
// -----------------------------------------------------------------

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
// HttpCode: permite cambiar el código HTTP de respuesta (ej: 201 Created)
// HttpStatus: constantes para códigos HTTP (200, 201, 204, 404, etc)

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')  // Todas las rutas empiezan con /categories
// Ejemplos:
// - GET    /categories
// - GET    /categories/abc-123
// - POST   /categories
// - PUT    /categories/abc-123
// - DELETE /categories/abc-123
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // Inyecta el servicio para usarlo en los métodos

  // ------------------------------------------------------------
  // RUTA: GET /categories
  // FUNCIÓN: Devuelve todas las categorías (con sus productos)
  // RESPUESTA: JSON con arreglo de categorías
  // CÓDIGO HTTP: 200 OK
  // ------------------------------------------------------------
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  // ------------------------------------------------------------
  // RUTA: GET /categories/:id (ej: GET /categories/550e8400-e29b-41d4-a716-446655440000)
  // FUNCIÓN: Devuelve una categoría específica por su ID
  // RESPUESTA: JSON con la categoría (incluye sus productos)
  // ------------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    // @Param('id'): extrae el valor después de /categories/
    return await this.categoriesService.findOneById(id);
  }

  // ------------------------------------------------------------
  // RUTA: POST /categories
  // FUNCIÓN: Crea una nueva categoría
  // QUÉ ENVÍA EL CLIENTE: JSON con { "name": "Electrónicos", "description": "..." }
  // RESPUESTA: JSON con la categoría creada (incluye su ID generado)
  // CÓDIGO HTTP: 201 Created (por defecto POST devuelve 201)
  // ------------------------------------------------------------
  @Post()
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    // @Body(): extrae el JSON del cuerpo de la petición
    return await this.categoriesService.createCategory(categoryData);
  }

  // ------------------------------------------------------------
  // RUTA: PUT /categories/:id
  // FUNCIÓN: Actualiza una categoría existente
  // QUÉ ENVÍA EL CLIENTE: JSON con los campos a actualizar
  // ------------------------------------------------------------
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, categoryData);
  }

  // ------------------------------------------------------------
  // RUTA: DELETE /categories/:id
  // FUNCIÓN: Elimina una categoría
  // RESPUESTA: No devuelve contenido (solo código HTTP)
  // CÓDIGO HTTP: 204 No Content (éxito pero sin respuesta)
  // ------------------------------------------------------------
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)  // Cambia el código por defecto (200) a 204
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categoriesService.deleteCategory(id);
  }
}