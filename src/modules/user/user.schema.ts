import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserType {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EMPLOYER = 'employer',
}


@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  businessNo: number;

  @Prop({ unique: true })
  phone: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ enum: UserType, default: UserType.EMPLOYER })
  userType: UserType;

  @Prop()
  passwordChangedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
