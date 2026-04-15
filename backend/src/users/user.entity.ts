// ENTIDAD = representa una TABLA en la base de datos
// Cada propiedad de esta clase es una COLUMNA de la tabla

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // Nombre de la tabla en PostgreSQL
export class User {
  @PrimaryGeneratedColumn('uuid') // Columna clave primaria, tipo UUID, se genera automático
  id: string;

  @Column({ type: 'varchar', length: 100 }) // Columna tipo texto, máximo 100 caracteres
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true }) // unique = no se repite el email
  email: string;

  @Column({ type: 'varchar', length: 255 }) // Aquí se guarda la contraseña encriptada
  password_hash: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' }) // Se llena automático al crear
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' }) // Se actualiza automático al modificar
  updated_at: Date;
}