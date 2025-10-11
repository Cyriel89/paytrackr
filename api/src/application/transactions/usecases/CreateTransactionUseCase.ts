import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto, type ITransactionRepository, TRANSACTION_REPOSITORY } from '../../../domain/transactions/ports/TransactionRepository';
import { Transaction } from '../../../domain/transactions/entities/TransactionEntity';
import { TransactionDomainService } from '../../../domain/transactions/services/TransactionDomainService';
@Injectable()
export class CreateTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly repository: ITransactionRepository,
        private readonly domain: TransactionDomainService,
    ) {}

    async execute(data: CreateTransactionDto): Promise<Transaction> {
        this.domain.validateCreate(data);
        console.log('[UC] validating amount=', data.amount);
        return await this.repository.create(data);
    }
}