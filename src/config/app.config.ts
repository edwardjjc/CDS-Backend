// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { GoogleApi, JwtConfig } from 'src/models/config';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: true,
      migrationsRun: true,
      entities: [join(__dirname, '/../entities/**/*.entity{.ts,.js}')],
      migrationsTableName: 'migrations',
      migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
      ssl: this.isProduction(),
    };
  }

  public getGoogleApiConfig(): GoogleApi {
    return {
      apiKey: this.getValue('GOOGLE_API_KEY'),
      distanceApi: this.getValue('GOOGLE_DISTANCE_API'),
      geolocationApi: this.getValue('GOOGLE_GEOLOCATION_API')
    };
  }

  public getJwtConfig(): JwtConfig {
    return {
      jwtSecret: this.getValue('JWT_SECRET_KEY'),
      jwtExpires: parseFloat(this.getValue('JWT_EXPIRES_IN')) * 60000,
      cookieKey: this.getValue('COOKIE_TOKEN_KEY')
    }
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'GOOGLE_API_KEY',
    'GOOGLE_DISTANCE_API',
    'GOOGLE_GEOLOCATION_API',
    'JWT_SECRET_KEY',
    'JWT_EXPIRES_IN',
    'COOKIE_TOKEN_KEY'
  ]);

export { configService };