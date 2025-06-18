import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
        });
    }

    async validate(payload: any) {
        // Get the user from DB
        const user = await this.userModel.findOne({ email: payload.email });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('User not found or inactive');
        }

        // Check if password was changed after token was issued
        if (user.passwordChangedAt) {
            const issuedAt = new Date(payload.iat * 1000);
            if (user.passwordChangedAt > issuedAt) {
                throw new UnauthorizedException('Token invalid due to password change');
            }
        }

        // Return only safe data for req.user
        return {
            userId: user._id,
            email: user.email,
            userType: user.userType,
        };
    }
}
