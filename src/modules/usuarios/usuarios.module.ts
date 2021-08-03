import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from "src/entities";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosServices } from "./usuarios.services";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), SecurityModule],
    controllers: [UsuariosController],
    providers: [UsuariosServices],
})
export class UsuariosModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(UsuariosController);
    }
}