// -----------------------------------------------------------------
// ARCHIVO: inventory.service.ts
// FUNCIÓN: Contiene TODA la lógica de negocio para manejar inventario (stock)
// IMPORTANCIA: Controla las cantidades de productos, alertas de stock mínimo, y movimientos
// CONEXIONES: Usa el repositorio de Inventory y el servicio de Products para validar productos
// -----------------------------------------------------------------

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private productsService: ProductsService,  // Para verificar que el producto existe
  ) {}

  // ------------------------------------------------------------
  // MÉTODO: createInventory
  // FUNCIÓN: Crea un registro de inventario para un producto
  // IMPORTANTE: Un producto SOLO puede tener UN inventario (relación 1:1)
  // VALIDACIÓN: Verifica que el producto exista ANTES de crear el inventario
  // ------------------------------------------------------------
  async createInventory(inventoryData: Partial<Inventory>): Promise<Inventory> {
    // Verificar que el producto existe
    const product = await this.productsService.findOneById(
      inventoryData.product_id as any,
    );
    
    if (!product) {
      throw new BadRequestException('El producto especificado no existe');
    }
    
    // Verificar si el producto ya tiene inventario (evitar duplicados)
    const existingInventory = await this.inventoryRepository.findOne({
      where: { product_id: { id: inventoryData.product_id as any } },
    });
    
    if (existingInventory) {
      throw new BadRequestException('Este producto ya tiene un registro de inventario');
    }
    
    const newInventory = this.inventoryRepository.create(inventoryData);
    return await this.inventoryRepository.save(newInventory);
  }

  // ------------------------------------------------------------
  // MÉTODO: findAll
  // FUNCIÓN: Obtiene TODOS los registros de inventario
  // INCLUYE: El producto relacionado (nombre, sku, etc)
  // ------------------------------------------------------------
  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      relations: ['product_id'],  // JOIN con products para traer datos del producto
    });
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneById
  // FUNCIÓN: Busca un registro de inventario por su ID
  // ------------------------------------------------------------
  async findOneById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['product_id'],
    });
    
    if (!inventory) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventory;
  }

  // ------------------------------------------------------------
  // MÉTODO: findByProductId
  // FUNCIÓN: Busca el inventario de un producto específico
  // ÚTIL PARA: Mostrar stock en la página de detalles del producto
  // ------------------------------------------------------------
  async findByProductId(productId: string): Promise<Inventory | null> {
    return await this.inventoryRepository.findOne({
      where: { product_id: { id: productId } },
      relations: ['product_id'],
    });
  }

  // ------------------------------------------------------------
  // MÉTODO: updateStock
  // FUNCIÓN: Actualiza la cantidad de stock de un producto
  // OPERACIONES: Puede ser "set" (asignar valor), "add" (sumar), "subtract" (restar)
  // ------------------------------------------------------------
  async updateStock(
    productId: string,
    operation: 'set' | 'add' | 'subtract',
    quantity: number,
  ): Promise<Inventory> {
    // Buscar el inventario del producto
    let inventory = await this.findByProductId(productId);
    
    if (!inventory) {
      // Si no existe inventario, crearlo con cantidad inicial 0
      const product = await this.productsService.findOneById(productId);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      
      inventory = await this.createInventory({
        product_id: product,
        quantity: 0,
        min_stock: 0,
      });
    }
    
    // Aplicar la operación solicitada
    let newQuantity = inventory.quantity;
    
    switch (operation) {
      case 'set':
        newQuantity = quantity;
        break;
      case 'add':
        newQuantity = inventory.quantity + quantity;
        break;
      case 'subtract':
        newQuantity = inventory.quantity - quantity;
        // Validar que no quede negativo
        if (newQuantity < 0) {
          throw new BadRequestException('No se puede reducir stock por debajo de 0');
        }
        break;
    }
    
    // Actualizar el inventario
    await this.inventoryRepository.update(inventory.id, {
      quantity: newQuantity,
      last_updated: new Date(),
    });
    
    return await this.findOneById(inventory.id);
  }

  // ------------------------------------------------------------
  // MÉTODO: updateMinStock
  // FUNCIÓN: Actualiza el stock mínimo de alerta para un producto
  // ------------------------------------------------------------
  async updateMinStock(productId: string, minStock: number): Promise<Inventory> {
    const inventory = await this.findByProductId(productId);
    
    if (!inventory) {
      throw new NotFoundException(`No hay inventario para el producto ${productId}`);
    }
    
    await this.inventoryRepository.update(inventory.id, { min_stock: minStock });
    return await this.findOneById(inventory.id);
  }

  // ------------------------------------------------------------
  // MÉTODO: getLowStockProducts
  // FUNCIÓN: Obtiene todos los productos cuyo stock está por debajo del mínimo
  // ÚTIL PARA: Dashboard de alertas (productos por reabastecer)
  // ------------------------------------------------------------
  async getLowStockProducts(): Promise<Inventory[]> {
    // Usa QueryBuilder para una consulta más compleja
    // SELECT * FROM inventory WHERE quantity <= min_stock
    return await this.inventoryRepository
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.product_id', 'product')
      .where('inventory.quantity <= inventory.min_stock')
      .getMany();
  }

  // ------------------------------------------------------------
  // MÉTODO: deleteInventory
  // FUNCIÓN: Elimina un registro de inventario (útil si se elimina el producto)
  // NOTA: Normalmente no se usa sola, el producto con ON DELETE CASCADE la elimina automáticamente
  // ------------------------------------------------------------
  async deleteInventory(id: string): Promise<void> {
    await this.findOneById(id);
    await this.inventoryRepository.delete(id);
  }
}