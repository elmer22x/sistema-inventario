// -----------------------------------------------------------------
// ARCHIVO: products.module.ts
// FUNCIÓN: Agrupa todo lo relacionado con productos (controlador, servicio, entidad)
// IMPORTANCIA: Conecta la entidad Product con la base de datos y otros módulos
// CONEXIONES: Importa TypeOrm para usar Product, y también importa CategoriesModule porque Product depende de Category
// -----------------------------------------------------------------

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CategoriesModule } from '../categories/categories.module';
// Importa CategoriesModule porque Product tiene relación MANY-TO-ONE con Category
// Necesita conocer la entidad Category para validar que existe cuando se crea un producto

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),  // Registra la entidad Product para hacer consultas
    CategoriesModule,  // Importa CategoriesModule para poder usar el servicio de categorías
    // CategoriesModule exportó TypeOrmModule, por eso podemos inyectar CategoryRepository aquí si es necesario
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],  // Exporta para que otros módulos (ej: Inventory) puedan usar Product
})
export class ProductsModule {}