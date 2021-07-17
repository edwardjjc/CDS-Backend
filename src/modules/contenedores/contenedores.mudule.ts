import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contenedores } from "src/entities";
import { ContenedoresController } from "./contenedores.controller";
import { ContenedoresServices } from "./contenedores.services";

@Module({
    imports: [TypeOrmModule.forFeature([Contenedores])],
    controllers: [ContenedoresController],
    providers: [ContenedoresServices],
})
export class ContenedoresModule {}