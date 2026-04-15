// Este archivo configura la conexión entre NestJS y PostgreSQL

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',           // Tipo de base de datos (PostgreSQL)
  host: 'localhost',          // Dónde está la DB (tu computadora)
  port: 5432,                 // Puerto por defecto de PostgreSQL
  username: 'postgres',       // Usuario administrador de PostgreSQL
  password: 'admin123',  // La contraseña que pusiste al instalar PostgreSQL
  database: 'sistema_inventario', // Nombre de la base de datos que creaste en pgAdmin
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Ubicación de las tablas (entidades)
  synchronize: true,          // Crea/actualiza tablas automáticamente (solo desarrollo)
  // NOTA: synchronize:true NO se usa en producción porque puede borrar datos
};