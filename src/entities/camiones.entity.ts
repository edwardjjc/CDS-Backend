/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Companias } from './companias.entity';
import { TiposCamiones } from './tipos-camiones.entity';
import { Rutas } from './rutas.entity';

@Entity({ name: 'camiones' })
export class Camiones extends BaseEntity {

  @ManyToOne(() => Companias, compania => compania.camiones)
  compania: Companias;

  @ManyToOne(() => TiposCamiones, tipoCamion => tipoCamion.camiones)
  tipoCamion: TiposCamiones;

  @OneToMany(() => Rutas, rutas => rutas.camion)
  rutas: Rutas[];

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ type: 'varchar', length: 300 })
  identificadorUnico: string;

  @Column({ type: 'varchar', length: 50 })
  marca: string;

  @Column({ type: 'varchar', length: 50 })
  modelo: string;

  @Column({ type: 'int' })
  anio: number;

  @Column({ type: 'varchar', length: 50 })
  color: string;
  
}