/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DispositivosIoT } from './dispositivos-iot.entity';
import { RutasContenedores } from './rutas-contenedores.entity';
import { TiposContenedores } from './tipos-contenedores.entity';

@Entity({ name: 'contenedores' })
export class Contenedores extends BaseEntity {

  @ManyToOne(() => TiposContenedores, tipoContenedor => tipoContenedor.contenedores)
  tipoContenedor: TiposContenedores;

  @OneToMany(() => DispositivosIoT, dispositivosIoT => dispositivosIoT.contenedor)
  dispositivosIoT: DispositivosIoT[];

  @OneToMany(() => RutasContenedores, rutasContenedeores => rutasContenedeores.contenedor)
  rutasContenedores: RutasContenedores[];

  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ type: 'varchar', length: 300 })
  direccion: string;

  @Column({ type: 'decimal', nullable: true })
  gpsLatitude: number;

  @Column({ type: 'decimal', nullable: true })
  gpsAltitude: number;
  
}