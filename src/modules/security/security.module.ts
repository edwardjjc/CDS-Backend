import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from "src/config/app.config";
import { Usuarios } from "src/entities";
import { SecurityMiddleware } from "src/middleware/security.middleware";
import { SecurityEvaluatorService } from "./security-evaluator.services";
import { SecurityController } from "./security.controller";
import { SecurityServices } from "./security.services";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), PassportModule, 
            JwtModule.register({
                secret: configService.jwtSecret,
                signOptions: { expiresIn: "12h" }
            })],
    controllers: [SecurityController],
    providers: [SecurityServices, SecurityEvaluatorService],
    exports: [SecurityEvaluatorService],
})
export class SecurityModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SecurityMiddleware).exclude({path: 'api/auth/login', method: RequestMethod.POST}).forRoutes(SecurityController)
    }
}