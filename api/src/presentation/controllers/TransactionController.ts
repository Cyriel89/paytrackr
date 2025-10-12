import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ListTransactionUseCase } from '../../application/transactions/usecases/ListTransactionUseCase';
import { CreateTransactionUseCase } from '../../application/transactions/usecases/CreateTransactionUseCase';
import { CreateTransactionDto } from '../dtos/CreateTransactionDto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/RolesDecorator';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly getTransactions: ListTransactionUseCase,
        private readonly createTransaction: CreateTransactionUseCase,
    ) {}

    @Get()
    findAll() {
        return this.getTransactions.execute();
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'ANALYST')
    @Post()
    create(@Req() req, @Body() data: CreateTransactionDto) {
        return this.createTransaction.execute({
            ...data,
            userId: req.user.userId, // <-- injecté depuis le token
        });
    }
}