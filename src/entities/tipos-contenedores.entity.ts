/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contenedores } from './contenedores.entity';

@Entity({ name: 'tipos_contenedores' })
export class TiposContenedores extends BaseEntity {

  @OneToMany(() => Contenedores, contenedores => contenedores.tipoContenedor)
  contenedores: Contenedores[];

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ type: 'varchar', length: 300 })
  dimensiones: string;

  @Column()
  cantidadMetros: number;
  
}