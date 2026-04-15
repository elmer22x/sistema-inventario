// -----------------------------------------------------------------
// ARCHIVO: inventory.module.ts
// FUNCIÓN: Agrupa todo lo relacionado con inventario (controlador, servicio, entidad)
// IMPORTANCIA: Maneja el stock de productos independientemente del producto en sí
// CONEXIONES: Importa TypeOrm para usar Inventory, y también importa ProductsModule para validar productos
// -----------------------------------------------------------------

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from 'src/products/products.service';
// Importa ProductsModule porque Inventory tiene relación ONE-TO-ONE con Product
// Necesita verificar que el producto existe antes de crear/actualizar inventario

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),  // Registra la entidad Inventory
    ProductsModule,  // Importa ProductsModule para poder usar el servicio de productos
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [TypeOrmModule],  // Exporta por si otros módulos necesitan Inventory
})
export class InventoryModule {}