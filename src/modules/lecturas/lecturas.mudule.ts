import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuraciones, Contenedores, DispositivosIoT, Lecturas, TiposContenedores, TiposSensores } from "src/entities";
import { SecurityModule } from "../security/security.module";
import { LecturasController } from "./lecturas.controller";
import { LecturasServices } from "./lecturas.services";

@Module({
    imports: [TypeOrmModule.forFeature([Lecturas]),
                TypeOrmModule.forFeature([DispositivosIoT]),
                TypeOrmModule.forFeature([TiposContenedores]),
                TypeOrmModule.forFeature([TiposSensores]),
                TypeOrmModule.forFeature([Contenedores]),
                TypeOrmModule.forFeature([Configuraciones]), SecurityModule],
    controllers: [LecturasController],
    providers: [LecturasServices],
})
export class LecturasModule {}