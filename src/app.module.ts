import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ServerModule } from './modules/server/server.module';
import { CompanyModule } from './modules/company/company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    DatabaseModule,
    ServerModule,
    CompanyModule,
    AuthModule
    // Add more modules here
  ],
})
export class AppModule {}
