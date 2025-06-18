import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,                // Available everywhere without re-import
      envFilePath: '.env',           // Load from .env file
    }),
  ],
})
export class ConfigModule {}
