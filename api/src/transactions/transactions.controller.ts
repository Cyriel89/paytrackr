import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/createTransactionDto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() dto:CreateTransactionDto) {
        return this.transactionsService.create({
            ...dto,
            userId: req.user.userId
        });
    }
}
