import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ServerModule } from './modules/server/server.module';
import { JwtStrategy } from './auth/jwt-auth.guard';
import { CompanyModule } from './modules/company/company.module';

@Module({
  providers: [
    JwtStrategy
  ],
  imports: [
    ConfigModule,
    UserModule,
    DatabaseModule,
    ServerModule,
    CompanyModule,
    // Add more modules here
  ],
})
export class AppModule {}
