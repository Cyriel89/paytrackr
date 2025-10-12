import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service'
import { ApiTags, ApiBearerAuth, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
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

    @ApiBody({ schema: {
        type: 'object',
        properties: {
        email: { type: 'string', example: 'admin@paytrackr.local' },
        password: { type: 'string', example: 'Admin!123' },
        }, required: ['email','password'] } })
    @ApiOkResponse({ description: 'JWT issued', schema: {
        type: 'object', properties: { access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } }})
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
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