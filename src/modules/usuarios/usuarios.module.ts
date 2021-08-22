import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfiles, Usuarios } from "src/entities";
import { SecurityModule } from "../security/security.module";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosServices } from "./usuarios.services";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), TypeOrmModule.forFeature([Perfiles]), SecurityModule],
    controllers: [UsuariosController],
    providers: [UsuariosServices],
})
export class UsuariosModule {}