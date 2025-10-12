import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ListTransactionUseCase } from '../../application/transactions/usecases/ListTransactionUseCase';
import { CreateTransactionUseCase } from '../../application/transactions/usecases/CreateTransactionUseCase';
import { CreateTransactionDto } from '../dtos/CreateTransactionDto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/RolesDecorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly getTransactions: ListTransactionUseCase,
        private readonly createTransaction: CreateTransactionUseCase,
    ) {}

    @Get()
    @ApiOkResponse({ description: 'List of transactions', schema: {
        type: 'array', items: {
        type: 'object', properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            amount: { type: 'number', format: 'float', example: 125.5 },
            currency: { type: 'string', enum: ['EUR','USD'], example: 'EUR' },
            status: { type: 'string', enum: ['PENDING','PAID','FAILED'], example: 'PAID' },
            createdAt: { type: 'string', format: 'date-time' },
        }
        }
    }})
    findAll() {
        return this.getTransactions.execute();
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'ANALYST')
    @Post()
    @ApiCreatedResponse({ description: 'Transaction created', schema: {
        type: 'object', properties: {
        id: { type: 'integer', example: 12 },
        userId: { type: 'integer', example: 1 },
        amount: { type: 'number', example: 10 },
        currency: { type: 'string', enum: ['EUR','USD'], example: 'EUR' },
        status: { type: 'string', enum: ['PENDING','PAID','FAILED'], example: 'PENDING' },
        createdAt: { type: 'string', format: 'date-time' },
        }
    }})
    @ApiBadRequestResponse({ description: 'Validation error' })
    @ApiUnauthorizedResponse({ description: 'Missing/invalid JWT' })
    @ApiForbiddenResponse({ description: 'Insufficient role (RBAC)' })
    create(@Req() req, @Body() data: CreateTransactionDto) {
        return this.createTransaction.execute({
            ...data,
            userId: req.user.userId, // <-- injecté depuis le token
        });
    }
}