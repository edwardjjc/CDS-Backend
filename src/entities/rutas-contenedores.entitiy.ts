/* eslint-disable prettier/prettier */
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contenedores } from './contenedores.entity';
import { Rutas } from './rutas.entity';

@Entity({ name: 'rutas_contenedores' })
export class RutasContenedores extends BaseEntity {

  @ManyToOne(() => Rutas, camiones => camiones.rutasContenedores)
  ruta: Rutas;

  @ManyToOne(() => Contenedores, contenedores => contenedores.rutasContenedores)
  contenedor: Contenedores;
  
}