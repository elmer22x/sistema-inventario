// -----------------------------------------------------------------
// ARCHIVO: products.controller.ts
// FUNCIÓN: Maneja las PETICIONES HTTP para productos
// RUTAS BASE: /products
// IMPORTANCIA: Expone las APIs que consumirá el frontend (Angular)
// -----------------------------------------------------------------

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
// Query: extrae parámetros de la URL (ej: ?sku=ABC-123)

import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ------------------------------------------------------------
  // RUTA: GET /products
  // FUNCIÓN: Devuelve todos los productos
  // ------------------------------------------------------------
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  // ------------------------------------------------------------
  // RUTA: GET /products/:id
  // FUNCIÓN: Devuelve un producto por ID
  // ------------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOneById(id);
  }

  // ------------------------------------------------------------
  // RUTA: GET /products/sku/:sku (ej: GET /products/sku/PROD-001)
  // FUNCIÓN: Devuelve un producto por su SKU (código único)
  // ------------------------------------------------------------
  @Get('sku/:sku')
  async findBySku(@Param('sku') sku: string): Promise<Product | null> {
    return await this.productsService.findOneBySku(sku);
  }

  // ------------------------------------------------------------
  // RUTA: GET /products/:id/stock
  // FUNCIÓN: Devuelve SOLO el stock de un producto
  // RESPUESTA: { "quantity": 100, "min_stock": 10 }
  // ------------------------------------------------------------
  @Get(':id/stock')
  async getStock(@Param('id') id: string): Promise<{ quantity: number; min_stock: number }> {
    return await this.productsService.getStock(id);
  }

  // ------------------------------------------------------------
  // RUTA: POST /products
  // FUNCIÓN: Crea un nuevo producto
  // QUÉ ENVÍA: { "name": "Laptop", "price": 999.99, "sku": "LAP-001", "category_id": "uuid-de-categoria" }
  // ------------------------------------------------------------
  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return await this.productsService.createProduct(productData);
  }

  // ------------------------------------------------------------
  // RUTA: PUT /products/:id
  // FUNCIÓN: Actualiza un producto
  // ------------------------------------------------------------
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, productData);
  }

  // ------------------------------------------------------------
  // RUTA: DELETE /products/:id
  // FUNCIÓN: Elimina un producto
  // ------------------------------------------------------------
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteProduct(id);
  }
}