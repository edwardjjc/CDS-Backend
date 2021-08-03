import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniasController } from "src/modules/companias/companias.controller";
import { CompaniasServices } from "src/modules/companias/companias.services";
import { Companias } from "src/entities/companias.entity";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityModule } from "../security/security.module";

@Module({
    imports: [TypeOrmModule.forFeature([Companias]), SecurityModule],
    controllers: [CompaniasController],
    providers: [CompaniasServices],
})
export class CompaniasModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).forRoutes(CompaniasController);
    }
    
}