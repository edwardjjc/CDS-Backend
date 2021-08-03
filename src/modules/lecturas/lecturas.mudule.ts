import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivosIoT, Lecturas, TiposSensores } from "src/entities";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";
import { LecturasController } from "./lecturas.controller";
import { LecturasServices } from "./lecturas.services";

@Module({
    imports: [TypeOrmModule.forFeature([Lecturas]),
                TypeOrmModule.forFeature([DispositivosIoT]),
                TypeOrmModule.forFeature([TiposSensores]), SecurityModule],
    controllers: [LecturasController],
    providers: [LecturasServices],
})
export class LecturasModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(LecturasController);
    }
}