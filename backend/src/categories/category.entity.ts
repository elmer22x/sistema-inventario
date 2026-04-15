import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;  // Ej: "Electrónicos", "Ropa", "Libros"

  @Column({ type: 'text', nullable: true }) // nullable = puede estar vacío
  description: string; // Descripción opcional de la categoría

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  // RELACIÓN: Una categoría tiene muchos productos
  // @OneToMany = uno a muchos
  // (category) => category.category_id = campo que relaciona en Product
  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
}