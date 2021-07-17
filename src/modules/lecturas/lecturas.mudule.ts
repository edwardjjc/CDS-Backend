import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturas } from "src/entities";
import { LecturasController } from "./lecturas.controller";
import { LecturasServices } from "./lecturas.services";

@Module({
    imports: [TypeOrmModule.forFeature([Lecturas])],
    controllers: [LecturasController],
    providers: [LecturasServices],
})
export class LecturasModule {}