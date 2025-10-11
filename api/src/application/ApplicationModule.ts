import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/InfrastructureModule';
import { CreateTransactionUseCase } from './transactions/usecases/CreateTransactionUseCase';
import { ListTransactionUseCase } from './transactions/usecases/ListTransactionUseCase';
import { TransactionDomainService } from 'src/domain/transactions/services/TransactionDomainService';

@Module({
  imports: [InfrastructureModule],
  providers: [
    TransactionDomainService,
    CreateTransactionUseCase,
    ListTransactionUseCase,
  ],
  exports: [
    CreateTransactionUseCase,
    ListTransactionUseCase,
  ],
})
export class ApplicationModule {}