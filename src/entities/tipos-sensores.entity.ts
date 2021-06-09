/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lecturas } from './lecturas.entity';

@Entity({ name: 'tipos_sensores' })
export class TiposSensores extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;
  
  @OneToMany(() => Lecturas, lecturas => lecturas.tipoSensor)
  lecturas: Lecturas[];

}