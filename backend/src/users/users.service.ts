// -----------------------------------------------------------------
// ARCHIVO: users.service.ts
// FUNCIÓN: Contiene TODA la lógica de negocio para manejar usuarios
// IMPORTANCIA: Es el "cerebro" - aquí se hacen las consultas a la DB, validaciones, etc
// CONEXIONES: Usa el repositorio de TypeORM para hacer CRUD a la tabla users
// -----------------------------------------------------------------

import { Injectable } from '@nestjs/common';
// @Injectable: permite que NestJS inyecte este servicio en otras clases (controladores)

import { InjectRepository } from '@nestjs/typeorm';
// InjectRepository: permite inyectar el repositorio de TypeORM para hacer consultas

import { Repository } from 'typeorm';
// Repository: objeto que tiene métodos como save(), find(), findOne(), delete()

import { User } from './user.entity';
// La entidad que vamos a manejar

@Injectable()
export class UsersService {
  // Constructor: se ejecuta automáticamente cuando se crea el servicio
  constructor(
    @InjectRepository(User)  // <--- Inyecta el repositorio de la entidad User
    private usersRepository: Repository<User>,  // <--- Lo guarda en esta variable privada
  ) {}

  // ------------------------------------------------------------
  // MÉTODO: createUser
  // FUNCIÓN: Guarda un nuevo usuario en la base de datos
  // QUÉ RECIBE: datos del usuario (name, email, password_hash)
  // QUÉ DEVUELVE: el usuario guardado (con su ID generado)
  // ------------------------------------------------------------
  async createUser(userData: Partial<User>): Promise<User> {
    // Partial<User>: permite enviar solo algunos campos de User, no todos obligatorios
    // Promise<User>: esta función es asíncrona y va a devolver un User
    
    const newUser = this.usersRepository.create(userData);
    // create(): crea una instancia de la entidad en memoria (NO guarda en DB aún)
    
    return await this.usersRepository.save(newUser);
    // save(): guarda en la base de datos y devuelve el registro completo
    // await: espera a que PostgreSQL termine de guardar
  }

  // ------------------------------------------------------------
  // MÉTODO: findAll
  // FUNCIÓN: Obtiene TODOS los usuarios de la base de datos
  // ------------------------------------------------------------
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
    // find(): SELECT * FROM users
    // User[]: devuelve un arreglo de usuarios
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneById
  // FUNCIÓN: Busca un usuario por su ID
  // ------------------------------------------------------------
  async findOneById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
    // findOne({ where: { id } }): SELECT * FROM users WHERE id = '...'
    // | null: si no encuentra, devuelve null
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneByEmail
  // FUNCIÓN: Busca un usuario por su email (útil para login)
  // ------------------------------------------------------------
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
    // Útil para validar si el email ya existe o para autenticación
  }

  // ------------------------------------------------------------
  // MÉTODO: updateUser
  // FUNCIÓN: Actualiza un usuario existente
  // ------------------------------------------------------------
  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, userData);
    // update(): UPDATE users SET ... WHERE id = ...
    
    return await this.findOneById(id);
    // Devuelve el usuario actualizado
  }

  // ------------------------------------------------------------
  // MÉTODO: deleteUser
  // FUNCIÓN: Elimina un usuario por su ID
  // ------------------------------------------------------------
  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
    // delete(): DELETE FROM users WHERE id = ...
    // void: no devuelve nada
  }
}