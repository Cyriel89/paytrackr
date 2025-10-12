import { IsNumber, IsEnum, IsPositive } from 'class-validator';
import { Currency, TransactionStatus } from '../../domain/transactions/entities/TransactionEntity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty({ example: 10.5, minimum: 0.01 })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({ enum: ['EUR', 'USD'], enumName: 'Currency' })
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty({ enum: ['PENDING', 'PAID', 'FAILED'], enumName: 'TransactionStatus' })
    @IsEnum(TransactionStatus)
    status: TransactionStatus;
}