import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniasController } from "src/modules/companias/companias.controller";
import { CompaniasServices } from "src/modules/companias/companias.services";
import { Companias } from "src/entities/companias.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Companias])],
    controllers: [CompaniasController],
    providers: [CompaniasServices],
})
export class CompaniasModule {}