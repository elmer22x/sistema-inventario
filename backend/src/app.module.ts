// Este archivo es el módulo PRINCIPAL de toda la aplicación NestJS
// NestJS funciona con módulos: cada módulo agrupa funcionalidades relacionadas

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot() configura la conexión a PostgreSQL
    // typeOrmConfig contiene los datos de conexión (host, usuario, contraseña, etc)
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    InventoryModule,
  ],
  // controllers: aquí van los controladores (rutas API)
  // providers: aquí van los servicios (lógica de negocio)
})
export class AppModule {}