import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Inventory } from '../inventory/inventory.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;  // Nombre del producto

  @Column({ type: 'text', nullable: true })
  description: string;  // Detalles del producto

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // 10 dígitos totales, 2 decimales
  price: number;  // Precio en dólares (ej: 99.99)

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;  // SKU = código único del producto (ej: "PROD-001")

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  // RELACIÓN: Muchos productos pertenecen a UNA categoría
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' }) // columna que guarda el ID de la categoría
  category_id: Category;

  // RELACIÓN: Un producto tiene UN inventario (uno a uno)
  @OneToOne(() => Inventory, (inventory) => inventory.product_id)
  inventory: Inventory;
}