import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Hash the password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        return createdUser.save();
    }

    async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            loginUserDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            userType: user.userType,
        };

        const token = this.jwtService.sign(payload);

        return { token };
    }

    async getProfile(userId: string): Promise<User> {
        return this.userModel.findById(userId, {password: 0, _id: 0})
    }

    async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            userId,
            { $set: updateProfileDto },
            { new: true },
        );
    }

    async updatePassword(userId: string, dto: UpdatePasswordDto): Promise<string> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashedNewPassword;
        user.passwordChangedAt = new Date();
        await user.save();

        return 'Password updated successfully';
    }
}
