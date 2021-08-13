import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuraciones, Contenedores, DistanciasContenedores } from "src/entities";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { SecurityModule } from "../security/security.module";
import { ContenedoresController } from "./contenedores.controller";
import { ContenedoresServices } from "./contenedores.services";

@Module({
    imports: [TypeOrmModule.forFeature([Contenedores, DistanciasContenedores, Configuraciones]), HttpModule, SecurityModule],
    controllers: [ContenedoresController],
    providers: [ContenedoresServices, DistanciaContenedoresServices],
})
export class ContenedoresModule {}