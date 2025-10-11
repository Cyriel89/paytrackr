import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto, type ITransactionRepository, TRANSACTION_REPOSITORY } from '../../../domain/transactions/ports/TransactionRepository';
import { Transaction } from '../../../domain/transactions/entities/TransactionEntity';
import { TransactionDomainService } from '../../../domain/transactions/services/TransactionDomainService';
@Injectable()
export class CreateTransactionsUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly repository: ITransactionRepository,
        private readonly domain: TransactionDomainService,
    ) {}

    execute(data: CreateTransactionDto): Promise<Transaction> {
        this.domain.validateCreate(data);
        try {
            return this.repository.create(data);
        } catch (e: any) {
            if (e?.code === 'P2003') throw new UnprocessableEntityException('Invalid userId');
            throw e;
        } 
    }
}