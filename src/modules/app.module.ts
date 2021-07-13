import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/bdconfig';
import { CompaniasModule } from './compania.mudule';
import { TiposCamionesModule } from './tipos-camiones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), CompaniasModule, TiposCamionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
