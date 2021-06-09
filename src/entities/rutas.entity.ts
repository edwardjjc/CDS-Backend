/* eslint-disable prettier/prettier */
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Camiones } from './camiones.entity';
import { RutasContenedores } from './rutas-contenedores.entitiy';

@Entity({ name: 'rutas' })
export class Rutas extends BaseEntity {

  @OneToMany(() => RutasContenedores, rutaContenedor => rutaContenedor.ruta)
  rutasContenedores: RutasContenedores[];

  @ManyToOne(() => Camiones, camiones => camiones.rutas)
  camion: Camiones;
  
}