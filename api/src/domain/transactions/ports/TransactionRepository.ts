import { Transaction } from '../entities/TransactionEntity'
import { Currency, TransactionStatus } from '../entities/TransactionEntity';

export interface ITransactionRepository {
    findAll(): Promise<Transaction[]>;
    create(data: CreateTransactionDto): Promise<Transaction>;
}

export interface CreateTransactionDto {
    userId: number;
    amount: number;
    currency: Currency;
    status: TransactionStatus;
}

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');