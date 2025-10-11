import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/InfrastructureModule';
import { CreateTransactionsUseCase } from './transactions/usecases/CreateTransactionUseCase';
import { ListTransactionUseCase } from './transactions/usecases/ListTransactionUseCase';
import { TransactionDomainService } from 'src/domain/transactions/services/TransactionDomainService';

@Module({
  imports: [InfrastructureModule],
  providers: [
    TransactionDomainService,
    CreateTransactionsUseCase,
    ListTransactionUseCase,
  ],
  exports: [
    CreateTransactionsUseCase,
    ListTransactionUseCase,
  ],
})
export class ApplicationModule {}