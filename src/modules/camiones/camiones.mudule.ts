import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camiones } from "src/entities";
import { CamionesController } from "./camiones.controller";
import { CamionesServices } from "./camiones.services";

@Module({
    imports: [TypeOrmModule.forFeature([Camiones]),],
    controllers: [CamionesController],
    providers: [CamionesServices]
})
export class CamionesModule {}