// -----------------------------------------------------------------
// ARCHIVO: users.controller.ts
// FUNCIÓN: Maneja las PETICIONES HTTP (rutas API) relacionadas con usuarios
// IMPORTANCIA: Es la "puerta de entrada" - recibe peticiones y llama al servicio
// CONEXIONES: Recibe datos del cliente (POST, GET, etc) y llama a UsersService
// -----------------------------------------------------------------

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
// Controller: decorador para definir que esta clase es un controlador
// Get, Post, Put, Delete: decoradores para cada método HTTP
// Body: extrae el cuerpo de la petición (datos JSON que envía el cliente)
// Param: extrae parámetros de la URL (ej: /users/123 donde 123 es el param)

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')  // <--- Todas las rutas de este controlador empiezan con /users
// Ejemplo: GET /users, POST /users, GET /users/123
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Inyecta el servicio para poder usarlo dentro del controlador

  // ------------------------------------------------------------
  // RUTA: GET /users
  // FUNCIÓN: Devuelve todos los usuarios
  // RESPUESTA: arreglo de usuarios en formato JSON
  // ------------------------------------------------------------
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
    // Llama al servicio que hace SELECT * FROM users
  }

  // ------------------------------------------------------------
  // RUTA: GET /users/:id (ej: GET /users/abc-123)
  // FUNCIÓN: Devuelve un usuario específico por su ID
  // ------------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    // @Param('id') extrae lo que viene después de /users/ en la URL
    return await this.usersService.findOneById(id);
  }

  // ------------------------------------------------------------
  // RUTA: POST /users
  // FUNCIÓN: Crea un nuevo usuario
  // QUÉ ENVÍA EL CLIENTE: JSON con { name, email, password_hash }
  // ------------------------------------------------------------
  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    // @Body() extrae el JSON que envió el cliente en el cuerpo de la petición
    // Ejemplo de JSON: { "name": "Juan", "email": "juan@mail.com", "password_hash": "123" }
    return await this.usersService.createUser(userData);
  }

  // ------------------------------------------------------------
  // RUTA: PUT /users/:id
  // FUNCIÓN: Actualiza un usuario existente
  // ------------------------------------------------------------
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<User | null> {
    return await this.usersService.updateUser(id, userData);
  }

  // ------------------------------------------------------------
  // RUTA: DELETE /users/:id
  // FUNCIÓN: Elimina un usuario
  // ------------------------------------------------------------
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}