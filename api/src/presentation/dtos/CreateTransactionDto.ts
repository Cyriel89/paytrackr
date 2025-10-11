import { IsNumber, IsEnum, IsPositive } from 'class-validator';
import { Currency, TransactionStatus } from '../../domain/transactions/entities/TransactionEntity';

export class CreateTransactionDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsEnum(Currency)
    currency: Currency;

    @IsEnum(TransactionStatus)
    status: TransactionStatus;
}