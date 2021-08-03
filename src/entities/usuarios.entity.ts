/* eslint-disable prettier/prettier */
import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { hash } from 'bcrypt';
import { Perfiles } from './perfiles.entity';

@Entity({ name: 'usuarios' })
export class Usuarios extends BaseEntity {
  
  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @ManyToOne(() => Perfiles, perfil => perfil.usuarios)
  perfil: Perfiles;
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      this.password = await hash(this.password, 10);
  }

}