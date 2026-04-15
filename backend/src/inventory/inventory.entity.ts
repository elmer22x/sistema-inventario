import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 0 }) // default = valor por defecto si no se envía
  quantity: number;  // Cantidad en stock (ej: 100 unidades)

  @Column({ type: 'int', default: 0 })
  min_stock: number;  // Stock mínimo para alertas (ej: si baja de 10, avisar)

  @CreateDateColumn({ type: 'timestamp', name: 'last_updated' })
  last_updated: Date;  // Última vez que se actualizó el stock

  // RELACIÓN: Un inventario pertenece a UN producto
  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'product_id' }) // columna que guarda el ID del producto
  product_id: Product;
}