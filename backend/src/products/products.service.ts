// -----------------------------------------------------------------
// ARCHIVO: products.service.ts
// FUNCIÓN: Contiene TODA la lógica de negocio para manejar productos
// IMPORTANCIA: Maneja la relación con categorías, valida que existan, y controla el stock vía inventario
// CONEXIONES: Usa el repositorio de Product y también inyecta CategoriesService para validar categorías
// -----------------------------------------------------------------

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// BadRequestException: error HTTP 400 para datos inválidos (ej: categoría no existe)

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoriesService } from '../categories/categories.service';
// Importa CategoriesService para poder verificar si la categoría existe antes de crear un producto

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,  // Inyecta el servicio de categorías
  ) {}

  // ------------------------------------------------------------
  // MÉTODO: createProduct
  // FUNCIÓN: Guarda un nuevo producto en la base de datos
  // VALIDACIONES: Verifica que la categoría exista ANTES de crear el producto
  // ------------------------------------------------------------
  async createProduct(productData: Partial<Product>): Promise<Product> {
    // Si se envió category_id, verificar que la categoría existe
    if (productData.category_id) {
      const category = await this.categoriesService.findOneById(
        productData.category_id as any,  // as any: conversión temporal, el ID viene como string
      );
      if (!category) {
        throw new BadRequestException('La categoría especificada no existe');
      }
    }

    const newProduct = this.productsRepository.create(productData);
    return await this.productsRepository.save(newProduct);
  }

  // ------------------------------------------------------------
  // MÉTODO: findAll
  // FUNCIÓN: Obtiene TODOS los productos
  // INCLUYE: La categoría relacionada y el inventario (stock)
  // ------------------------------------------------------------
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: ['category_id', 'inventory'],  // JOIN con categories y con inventory
      // Así cada producto devuelve: { ..., category: { id, name }, inventory: { quantity, min_stock } }
    });
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneById
  // FUNCIÓN: Busca un producto por su ID
  // INCLUYE: Categoría e inventario
  // ------------------------------------------------------------
  async findOneById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category_id', 'inventory'],
    });
    
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  // ------------------------------------------------------------
  // MÉTODO: findOneBySku
  // FUNCIÓN: Busca un producto por su SKU (código único)
  // ÚTIL PARA: Verificar si ya existe un producto con ese SKU antes de crear
  // ------------------------------------------------------------
  async findOneBySku(sku: string): Promise<Product | null> {
    return await this.productsRepository.findOne({
      where: { sku },
      relations: ['category_id', 'inventory'],
    });
  }

  // ------------------------------------------------------------
  // MÉTODO: updateProduct
  // FUNCIÓN: Actualiza un producto existente
  // VALIDACIONES: Si se cambia la categoría, verifica que la nueva exista
  // ------------------------------------------------------------
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    // Verifica que el producto existe
    await this.findOneById(id);
    
    // Si se está cambiando la categoría, verificar que existe
    if (productData.category_id) {
      const category = await this.categoriesService.findOneById(
        productData.category_id as any,
      );
      if (!category) {
        throw new BadRequestException('La categoría especificada no existe');
      }
    }
    
    await this.productsRepository.update(id, productData);
    return await this.findOneById(id);
  }

  // ------------------------------------------------------------
  // MÉTODO: deleteProduct
  // FUNCIÓN: Elimina un producto por su ID
  // EFECTO: El inventario relacionado se elimina automáticamente (ON DELETE CASCADE en la DB)
  // ------------------------------------------------------------
  async deleteProduct(id: string): Promise<void> {
    await this.findOneById(id);  // Verifica que existe
    await this.productsRepository.delete(id);
  }

  // ------------------------------------------------------------
  // MÉTODO: getStock
  // FUNCIÓN: Obtiene el stock actual de un producto
  // DEVUELVE: cantidad disponible y stock mínimo
  // ------------------------------------------------------------
  async getStock(productId: string): Promise<{ quantity: number; min_stock: number }> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['inventory'],
    });
    
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    
    return {
      quantity: product.inventory?.quantity || 0,
      min_stock: product.inventory?.min_stock || 0,
    };
  }
}