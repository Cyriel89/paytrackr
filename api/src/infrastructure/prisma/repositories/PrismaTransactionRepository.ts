import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITransactionRepository, CreateTransactionDto } from '../../../domain/transactions/ports/TransactionRepository';
import { Transaction } from '../../../domain/transactions/entities/TransactionEntity';
import { TransactionMapper } from '../../mappers/TransactionMapper';

@Injectable()
export class PrismaTransactionsRepository implements ITransactionRepository {
    constructor(private readonly prisma: PrismaService) {}

    // GET /transactions
    async findAll(): Promise<Transaction[]> {
        const transactions = await this.prisma.transaction.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return transactions.map(TransactionMapper.toDomain);
    }

    // POST /transactions
    async create(data: CreateTransactionDto): Promise<Transaction> {
        const transaction = await this.prisma.transaction.create({
            data: {
                userId: data.userId,
                amount: data.amount,
                currency: data.currency,
                status: data.status,
            },
        });
        return TransactionMapper.toDomain(transaction);
    }
}