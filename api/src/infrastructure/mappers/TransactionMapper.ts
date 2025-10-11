import { Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction, Currency, TransactionStatus } from '../../domain/transactions/entities/TransactionEntity';

export class TransactionMapper {
    static toDomain(prisma: PrismaTransaction): Transaction {
        return new Transaction(
            prisma.id,
            prisma.userId,
            prisma.amount,
            prisma.currency as Currency, // Conversion du string Prisma vers l'enum Domain
            prisma.status as TransactionStatus,
            prisma.createdAt,
        );
    }

    static toPrisma(domain: Transaction): Omit<PrismaTransaction, 'id' | 'createdAt'> {
        return {
            userId: domain.userId,
            amount: domain.amount,
            currency: domain.currency,
            status: domain.status,
        };
    }
}