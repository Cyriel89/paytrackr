import { IsIn, IsInt, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber() @Min(0.01) amount: number;
  @IsIn(['EUR','USD']) currency: 'EUR' | 'USD';
  @IsIn(['PENDING','PAID','FAILED']) status: 'PENDING'|'PAID'|'FAILED';
}