import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  })]
})
export class AuthModule {}
