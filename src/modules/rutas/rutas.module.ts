import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camiones, Configuraciones, Contenedores, DistanciasContenedores, Rutas, RutasContenedores } from "src/entities";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { SecurityModule } from "../security/security.module";
import { RutasController } from "./rutas.controller";
import { RutasServices } from "./rutas.services";

@Module({
    imports: [TypeOrmModule.forFeature([Rutas, RutasContenedores, Camiones, Contenedores, DistanciasContenedores, Configuraciones]), HttpModule, SecurityModule],
    controllers: [RutasController],
    providers: [RutasServices, DistanciaContenedoresServices],
})
export class RutasModule {}