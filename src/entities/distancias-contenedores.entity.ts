/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contenedores } from './contenedores.entity';

@Entity({ name: 'distancias_contenedores' })
export class DistanciasContenedores extends BaseEntity {
  
  @ManyToOne(() => Contenedores, origen => origen.rutasContenedores)
  contenedorOrigen: Contenedores;

  @ManyToOne(() => Contenedores, destino => destino.rutasContenedores)
  contenedorDestino: Contenedores;

  @Column({ type: "decimal" })
  distancia: number;

  @Column({ type: "varchar", length: 300 })
  distanciaStr: string;

  @Column({ type: "decimal" })
  duracion: number;

  @Column({ type: "varchar", length: 300 })
  duracionStr: string;
}