import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/TransactionController';
import { ApplicationModule } from '../application/ApplicationModule';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [ApplicationModule, AuthModule],
    controllers: [TransactionsController],
})
export class PresentationModule {}