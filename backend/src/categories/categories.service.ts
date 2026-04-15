// -----------------------------------------------------------------
// ARCHIVO: categories.service.ts
// FUNCIÓN: Contiene TODA la lógica de negocio para manejar categorías
// IMPORTANCIA: Es donde se hacen las consultas a la base de datos y validaciones
// CONEXIONES: Usa el repositorio de TypeORM para hacer CRUD a la tabla categories
// -----------------------------------------------------------------

import { Injectable, NotFoundException } from '@nestjs/common';
// Injectable: permite que NestJS inyecte este servicio en el controlador
// NotFoundException: error que se lanza cuando no se encuentra una categoría (devuelve HTTP 404)

import { InjectRepository } from '@nestjs/typeorm';
// InjectRepository: permite inyectar el repositorio de TypeORM

import { Repository } from 'typeorm';
// Repository: objeto con métodos para la DB (save, find, delete, update)

import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)  // Inyecta el repositorio de la entidad Category
    private categoriesRepository: Repository<Category>,  // Lo guarda en esta variable
  ) {}

  // ------------------------------------------------------------
  // MÉTODO: createCategory
  // FUNCIÓN: Guarda una nueva categoría en la base de datos
  // QUÉ RECIBE: datos de la categoría (name, description opcional)
  // QUÉ DEVUELVE: la categoría guardada (con su ID generado)
  // ------------------------------------------------------------
  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    // Partial<Category>: permite enviar solo algunos campos (name es obligatorio, description no)
    const newCategory = this.categoriesRepository.create(categoryData);
    // create(): crea la instancia en memoria (no guarda aún)
    
    return await this.categoriesRepository.save(newCategory);
    // save(): INSERT INTO categories VALUES (...) y devuelve el registro
  }

  // ------------------------------------------------------------
  // MÉTODO: findAll
  // FUNCIÓN: Obtiene TODAS las categorías
  // IMPORTANTE: Incluye los productos relacionados (relación OneToMany)
  // ------------------------------------------------------------
  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: ['products'],  // Carga también los productos de cada categoría
      // relations: hace un JOIN con la tabla products
      // Sin esto, products vendría vacío
    });
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneById
  // FUNCIÓN: Busca una categoría por su ID
  // ------------------------------------------------------------
  async findOneById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products'],  // También trae los productos relacionados
    });
    
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      // Si no existe, lanza error 404
    }
    
    return category;
  }

  // ------------------------------------------------------------
  // MÉTODO: updateCategory
  // FUNCIÓN: Actualiza una categoría existente
  // ------------------------------------------------------------
  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    // Primero verifica que la categoría existe
    await this.findOneById(id);  // Si no existe, lanza NotFoundException
    
    await this.categoriesRepository.update(id, categoryData);
    // update(): UPDATE categories SET ... WHERE id = ...
    
    return await this.findOneById(id);  // Devuelve la categoría actualizada
  }

  // ------------------------------------------------------------
  // MÉTODO: deleteCategory
  // FUNCIÓN: Elimina una categoría por su ID
  // ADVERTENCIA: Si tiene productos relacionados, la relación tiene ON DELETE SET NULL
  //              (los productos se quedan sin categoría, no se eliminan)
  // ------------------------------------------------------------
  async deleteCategory(id: string): Promise<void> {
    await this.findOneById(id);  // Verifica que existe antes de eliminar
    await this.categoriesRepository.delete(id);
    // delete(): DELETE FROM categories WHERE id = ...
  }
}