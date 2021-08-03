/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Usuarios } from './usuarios.entity';

@Entity({ name: 'perfiles' })
export class Perfiles extends BaseEntity {
  
  @Column({ type: 'varchar', length: 300 })
  descripcion: string;

  @OneToMany(() => Usuarios, usuario => usuario.perfil)
  usuarios: Usuarios[];

}