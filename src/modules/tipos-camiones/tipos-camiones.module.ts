import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCamionesController } from "src/modules/tipos-camiones/tipos-camiones.controller";
import { TiposCamiones } from "src/entities/tipos-camiones.entity";
import { TiposCamionesServices } from "src/modules/tipos-camiones/tipos-camiones.services";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";

@Module({
    imports: [TypeOrmModule.forFeature([TiposCamiones]), SecurityModule],
    controllers: [TiposCamionesController],
    providers: [TiposCamionesServices],
})
export class TiposCamionesModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(TiposCamionesController);
    }
}