// -----------------------------------------------------------------
// ARCHIVO: users.module.ts
// FUNCIÓN: Agrupa todo lo relacionado con usuarios (controlador, servicio, entidad)
// IMPORTANCIA: NestJS usa módulos para organizar el código. Sin esto, el controlador y servicio no funcionan
// CONEXIONES: Importa TypeOrm para usar la entidad User, exporta TypeOrm para que otros módulos puedan usar User
// -----------------------------------------------------------------

import { Module } from '@nestjs/common';
// @Module: decorador que le dice a NestJS que esta clase es un módulo

import { TypeOrmModule } from '@nestjs/typeorm';
// TypeOrmModule: permite conectar la entidad con la base de datos

import { UsersController } from './users.controller';
// Controlador: maneja las peticiones HTTP (GET, POST, PUT, DELETE)

import { UsersService } from './users.service';
// Servicio: contiene la lógica de negocio (crear usuario, buscar, etc)

import { User } from './user.entity';
// Entidad: la tabla de usuarios que creamos antes

@Module({
  imports: [
    TypeOrmModule.forFeature([User])  // <--- Registra la entidad User para que TypeORM la reconozca
    // forFeature: crea un repositorio para esta entidad dentro del módulo
    // Sin esto, no se puede hacer consultas a la tabla users
  ],
  controllers: [UsersController],  // <--- Los controladores que pertenecen a este módulo
  providers: [UsersService],       // <--- Los servicios que pertenecen a este módulo
  exports: [UsersService]         // <--- Exporta TypeOrmModule para que OTROS módulos puedan usar User
  // Ejemplo: si Products necesita relacionarse con User, necesita este export
})
export class UsersModule {}
// Export class: hace que la clase esté disponible para otros archivos