import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/registerDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Get()
    findAllUsers() {
        return this.authService.findAllUsers();
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        console.log('[auth/login] body=', signInDto);
        const res = await this.authService.signIn(signInDto.email, signInDto.password);
        console.log('[auth/login] result=', res);
        return res;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    registerPublic(@Body() dto: RegisterDto) {
        return this.authService.register({ email: dto.email, password: dto.password });
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post('register/admin')
    @UseGuards(JwtAuthGuard)
    registerAdmin(@Req() req, @Body() dto: RegisterDto) {
        return this.authService.register({ email: dto.email, password: dto.password, role: dto.role }, req.user);
    }
}