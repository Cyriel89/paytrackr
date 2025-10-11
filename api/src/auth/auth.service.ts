import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  // GET /auth
  async findAllUsers() {
    return this.prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true }
    });
  }

  // POST /auth/login
  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email }});
    console.log('[login] email=', email);
    console.log('[login] found user=', !!user);
    if(!user || !(await argon2.verify(user.password, password))) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role};
    const access_token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
    return { access_token };
  }

  // POST /auth/register (réservé à l'admin)
  async register(dto : { email: string, password: string, role?: 'ADMIN' | 'ANALYST' | 'VIEWER' }, caller?: { role: string }) {
    const email = dto.email.trim().toLowerCase();
    const passwordhash = await argon2.hash(dto.password);

    let role: 'ADMIN' | 'ANALYST' | 'VIEWER' = 'VIEWER';
    if(dto.role) {
        if(caller?.role !== 'ADMIN') {
            throw new UnauthorizedException('Only admin can assign roles');
        }
        role = dto.role;
    }
    try {
        const user = await this.prisma.user.create({
            data: { email, password: passwordhash, role }
        });
        return user;
    } catch (e: any) {
        if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
            throw new UnauthorizedException('Email already in use');
        }
        throw e;
    }
  }

}
