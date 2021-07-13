import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCamionesController } from "src/controllers/tipos-camiones.controller";
import { TiposCamiones } from "src/entities/tipos-camiones.entity";
import { TiposCamionesServices } from "src/services/tipos-camiones.services";

@Module({
    imports: [TypeOrmModule.forFeature([TiposCamiones])],
    controllers: [TiposCamionesController],
    providers: [TiposCamionesServices],
})
export class TiposCamionesModule {}