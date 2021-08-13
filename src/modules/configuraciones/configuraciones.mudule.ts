import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuraciones } from "src/entities";
import { ConfiguracionesController } from "./configuraciones.controller";
import { ConfiguracionesServices } from "./configuraciones.services";

@Module({
    imports: [TypeOrmModule.forFeature([Configuraciones]),],
    controllers: [ConfiguracionesController],
    providers: [ConfiguracionesServices]
})
export class ConfiguracionesModule {}