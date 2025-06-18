import { Body, Controller, Patch, Post, UseGuards, Request, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.userService.login(loginUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<User> {
        return this.userService.getProfile(req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile-update')
    async updateProfile(
        @Request() req,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<User> {
        return this.userService.updateProfile(req.user.userId, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('password-update')
    async updatePassword(
        @Request() req,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ): Promise<{ message: string }> {
        const message = await this.userService.updatePassword(req.user.userId, updatePasswordDto);
        return { message };
    }
}
