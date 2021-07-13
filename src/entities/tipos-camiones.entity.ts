/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Camiones } from './camiones.entity';

@Entity({ name: 'tipos_camiones' })
export class TiposCamiones extends BaseEntity {

  @OneToMany(() => Camiones, camiones => camiones.tipoCamion)
  camiones: Camiones[];

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ type: 'decimal' })
  cantidadMetros: number;
  
}