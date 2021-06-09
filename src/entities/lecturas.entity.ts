/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DispositivosIoT } from './dispositivos-iot.entity';
import { TiposSensores } from './tipos-sensores.entity';

@Entity({ name: 'lecturas' })
export class Lecturas extends BaseEntity {

  @ManyToOne(() => DispositivosIoT, dispositivoIoT => dispositivoIoT.lecturas)
  dispositivoIoT: DispositivosIoT;
 
  @ManyToOne(() => TiposSensores, tipoSensor => tipoSensor.lecturas)
  tipoSensor: TiposSensores;
  
  @Column()
  lectura: number;
  
}