// -----------------------------------------------------------------
// ARCHIVO: categories.module.ts
// FUNCIÓN: Agrupa todo lo relacionado con categorías (controlador, servicio, entidad)
// IMPORTANCIA: Permite que NestJS reconozca y organice el código de categorías
// CONEXIONES: Importa TypeOrm para usar la entidad Category, la conecta con el controlador y servicio
// -----------------------------------------------------------------

import { Module } from '@nestjs/common';
// @Module: decorador que define esta clase como un módulo de NestJS

import { TypeOrmModule } from '@nestjs/typeorm';
// TypeOrmModule: permite usar TypeORM (base de datos) dentro del módulo

import { CategoriesController } from './categories.controller';
// Controlador: maneja las rutas HTTP para categorías (GET /categories, POST /categories, etc)

import { CategoriesService } from './categories.service';
// Servicio: contiene la lógica de negocio (crear categoría, listar, editar, eliminar)

import { Category } from './category.entity';
// Entidad: la tabla de categorías que creamos antes

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])  // Registra la entidad Category para hacer consultas a la tabla
    // forFeature: crea un repositorio específico para esta entidad dentro de este módulo
    // Sin esto, no se puede hacer CategoryRepository.find() o .save()
  ],
  controllers: [CategoriesController],  // El controlador que responde a las rutas HTTP
  providers: [CategoriesService],       // El servicio que tiene la lógica
  exports: [CategoriesService]              // Exporta para que OTROS módulos (ej: Products) puedan usar Category
  // Products necesita saber qué es Category para la relación (muchos a uno)
})
export class CategoriesModule {}