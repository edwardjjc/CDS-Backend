import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposContenedores } from "src/entities/tipos-contenedores.entity";
import { TiposContenedoresController } from "./tipos-contenedores.controller";
import { TiposContenedoresServices } from "./tipos-contenedores.services";

@Module({
    imports: [TypeOrmModule.forFeature([TiposContenedores])],
    controllers: [TiposContenedoresController],
    providers: [TiposContenedoresServices],
})
export class TiposContenedoresModule {}