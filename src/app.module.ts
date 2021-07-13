import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/bdconfig';
import { CompaniasModule, TiposCamionesModule, TiposContenedoresModule, TiposSensoresModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    CompaniasModule, 
    TiposCamionesModule, 
    TiposContenedoresModule,
    TiposSensoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
