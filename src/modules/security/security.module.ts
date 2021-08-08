import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from "src/config/app.config";
import { Usuarios } from "src/entities";
import { SecurityEvaluatorService } from "./security-evaluator.services";
import { SecurityController } from "./security.controller";
import { SecurityServices } from "./security.services";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), PassportModule,
    JwtModule.register({
        secret: configService.getJwtConfig().jwtSecret
    })],
    controllers: [SecurityController],
    providers: [SecurityServices, SecurityEvaluatorService, LocalStrategy]
})
export class SecurityModule {}