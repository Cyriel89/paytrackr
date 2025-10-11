import { Inject, Injectable } from '@nestjs/common';
import { type ITransactionRepository, TRANSACTION_REPOSITORY } from '../../../domain/transactions/ports/TransactionRepository';
import { Transaction } from '../../../domain/transactions/entities/TransactionEntity';

@Injectable()
export class ListTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly repository: ITransactionRepository,
    ) {}

    execute(): Promise<Transaction[]> {
        return this.repository.findAll();
    }
}