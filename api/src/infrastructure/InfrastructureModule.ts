import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTransactionsRepository } from './prisma/repositories/PrismaTransactionRepository';
import { TRANSACTION_REPOSITORY } from '../domain/transactions/ports/TransactionRepository';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [
        PrismaService,
        {
            provide: TRANSACTION_REPOSITORY,
            useClass: PrismaTransactionsRepository,
        },
    ],
    exports: [PrismaModule, { provide: TRANSACTION_REPOSITORY, useClass: PrismaTransactionsRepository }],
})
export class InfrastructureModule {}