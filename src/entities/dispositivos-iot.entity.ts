/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contenedores } from './contenedores.entity';
import { Lecturas } from './lecturas.entity';

@Entity({ name: 'dispositivos_iot' })
export class DispositivosIoT extends BaseEntity {

  @OneToMany(() => Lecturas, lecturas => lecturas.dispositivoIoT)
  lecturas: Lecturas[];

  @ManyToOne(() => Contenedores, contendeor => contendeor.dispositivosIoT)
  contenedor: Contenedores;

  @Column({ type: 'varchar', length: 100 })
  noSerie: string;
  
}