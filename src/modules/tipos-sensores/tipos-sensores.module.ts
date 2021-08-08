import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposSensores } from "src/entities/tipos-sensores.entity";
import { SecurityModule } from "../security/security.module";
import { TiposSensoresController } from "./tipos-sensores.controller";
import { TiposSensoresServices } from "./tipos-sensores.services";

@Module({
    imports: [TypeOrmModule.forFeature([TiposSensores]), SecurityModule],
    controllers: [TiposSensoresController],
    providers: [TiposSensoresServices],
})
export class TiposSensoresModule {}