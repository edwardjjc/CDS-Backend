/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'configuraciones' })
export class Configuraciones extends BaseEntity {

  @Column({ type: 'decimal', nullable: true })
  porcentajeMaxContenedores: number;

  @Column({ type: 'varchar', length: 300, nullable: true})
  direccionPuntoOrigen: string;

  @Column({ type: 'decimal', nullable: true })
  gpsLatitudePuntoOrigen: number;

  @Column({ type: 'decimal', nullable: true })
  gpsAltitudePuntoOrigen: number;

  @Column({ type: 'varchar', length: 300, nullable: true})
  direccionPuntoDestino: string;

  @Column({ type: 'decimal', nullable: true })
  gpsLatitudePuntoDestino: number;

  @Column({ type: 'decimal', nullable: true })
  gpsAltitudePuntoDestino: number;

  @Column({ type: 'timestamptz', nullable: true })
  fechaUltimaConstruccion: Date;
  
}