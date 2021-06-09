/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Camiones } from './camiones.entity';

@Entity({ name: 'companias' })
export class Companias extends BaseEntity {

  @OneToMany(() => Camiones, camiones => camiones.compania)
  camiones: Camiones[];

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ type: 'varchar', length: 300 })
  direccion: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;
  
}