import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposContenedores } from "src/entities/tipos-contenedores.entity";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";
import { TiposContenedoresController } from "./tipos-contenedores.controller";
import { TiposContenedoresServices } from "./tipos-contenedores.services";

@Module({
    imports: [TypeOrmModule.forFeature([TiposContenedores]), SecurityModule],
    controllers: [TiposContenedoresController],
    providers: [TiposContenedoresServices],
})
export class TiposContenedoresModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(TiposContenedoresController);
    }
}