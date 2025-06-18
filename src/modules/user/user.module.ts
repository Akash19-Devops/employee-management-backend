import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
    signOptions: { expiresIn: '1h' }, // Token expiration time
  }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule]
})
export class UserModule { }
