import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivosIoT } from "src/entities";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";
import { DispositivosIoTController } from "./dispositivos-iot.controller";
import { DispositivosIoTServices } from "./dispositivos-iot.services";

@Module({
    imports: [TypeOrmModule.forFeature([DispositivosIoT]), SecurityModule],
    controllers: [DispositivosIoTController],
    providers: [DispositivosIoTServices],
})
export class DispositivosIoTModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(DispositivosIoTController);
    }
}