import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivosIoT, Lecturas, TiposSensores } from "src/entities";
import { LecturasController } from "./lecturas.controller";
import { LecturasServices } from "./lecturas.services";

@Module({
    imports: [TypeOrmModule.forFeature([Lecturas]),
                TypeOrmModule.forFeature([DispositivosIoT]),
                TypeOrmModule.forFeature([TiposSensores])],
    controllers: [LecturasController],
    providers: [LecturasServices],
})
export class LecturasModule {}