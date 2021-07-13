import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposSensores } from "src/entities/tipos-sensores.entity";
import { TiposSensoresController } from "./tipos-sensores.controller";
import { TiposSensoresServices } from "./tipos-sensores.services";

@Module({
    imports: [TypeOrmModule.forFeature([TiposSensores])],
    controllers: [TiposSensoresController],
    providers: [TiposSensoresServices],
})
export class TiposSensoresModule {}