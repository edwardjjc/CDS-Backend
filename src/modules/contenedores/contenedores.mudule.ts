import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contenedores, DistanciasContenedores } from "src/entities";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { DistanciaContenedoresServices } from "../distancias-contenedores/distancias-contenedores.services";
import { SecurityModule } from "../security/security.module";
import { ContenedoresController } from "./contenedores.controller";
import { ContenedoresServices } from "./contenedores.services";

@Module({
    imports: [TypeOrmModule.forFeature([Contenedores, DistanciasContenedores]), HttpModule, SecurityModule],
    controllers: [ContenedoresController],
    providers: [ContenedoresServices, DistanciaContenedoresServices],
})
export class ContenedoresModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(ContenedoresController);
    }
}