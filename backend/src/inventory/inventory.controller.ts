// -----------------------------------------------------------------
// ARCHIVO: inventory.controller.ts
// FUNCIÓN: Maneja las PETICIONES HTTP para inventario
// RUTAS BASE: /inventory
// IMPORTANCIA: Expone APIs para consultar stock, actualizar cantidades, y alertas de bajo stock
// -----------------------------------------------------------------

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // ------------------------------------------------------------
  // RUTA: GET /inventory
  // FUNCIÓN: Devuelve TODOS los registros de inventario (con sus productos)
  // RESPUESTA: Arreglo de inventarios
  // ------------------------------------------------------------
  @Get()
  async findAll(): Promise<Inventory[]> {
    return await this.inventoryService.findAll();
  }

  // ------------------------------------------------------------
  // RUTA: GET /inventory/:id
  // FUNCIÓN: Devuelve un registro de inventario por su ID
  // ------------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Inventory> {
    return await this.inventoryService.findOneById(id);
  }

  // ------------------------------------------------------------
  // RUTA: GET /inventory/product/:productId
  // FUNCIÓN: Devuelve el inventario de un producto específico
  // EJEMPLO: GET /inventory/product/550e8400-...
  // ------------------------------------------------------------
  @Get('product/:productId')
  async findByProduct(@Param('productId') productId: string): Promise<Inventory | null> {
    return await this.inventoryService.findByProductId(productId);
  }

  // ------------------------------------------------------------
  // RUTA: GET /inventory/low-stock/alerts
  // FUNCIÓN: Devuelve productos con stock BAJO (quantity <= min_stock)
  // ÚTIL PARA: Dashboard con alertas
  // ------------------------------------------------------------
  @Get('low-stock/alerts')
  async getLowStock(): Promise<Inventory[]> {
    return await this.inventoryService.getLowStockProducts();
  }

  // ------------------------------------------------------------
  // RUTA: POST /inventory
  // FUNCIÓN: Crea un registro de inventario para un producto
  // QUÉ ENVÍA: { "product_id": "uuid", "quantity": 100, "min_stock": 10 }
  // ------------------------------------------------------------
  @Post()
  async create(@Body() inventoryData: Partial<Inventory>): Promise<Inventory> {
    return await this.inventoryService.createInventory(inventoryData);
  }

  // ------------------------------------------------------------
  // RUTA: PUT /inventory/stock/:productId
  // FUNCIÓN: Actualiza el stock de un producto (operaciones: set, add, subtract)
  // QUÉ ENVÍA: { "operation": "add", "quantity": 50 }
  // operation puede ser: "set" (asignar), "add" (sumar), "subtract" (restar)
  // ------------------------------------------------------------
  @Put('stock/:productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body() body: { operation: 'set' | 'add' | 'subtract'; quantity: number },
  ): Promise<Inventory> {
    return await this.inventoryService.updateStock(
      productId,
      body.operation,
      body.quantity,
    );
  }

  // ------------------------------------------------------------
  // RUTA: PUT /inventory/min-stock/:productId
  // FUNCIÓN: Actualiza el stock mínimo de alerta
  // QUÉ ENVÍA: { "minStock": 20 }
  // ------------------------------------------------------------
  @Put('min-stock/:productId')
  async updateMinStock(
    @Param('productId') productId: string,
    @Body() body: { minStock: number },
  ): Promise<Inventory> {
    return await this.inventoryService.updateMinStock(productId, body.minStock);
  }

  // ------------------------------------------------------------
  // RUTA: DELETE /inventory/:id
  // FUNCIÓN: Elimina un registro de inventario
  // ------------------------------------------------------------
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.inventoryService.deleteInventory(id);
  }
}