import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [TransactionsModule, PrismaModule, AuthModule, ThrottlerModule.forRoot({
    throttlers: [
        {
          ttl: 60,    // 60 seconds
          limit: 30,  // 30 requests per minute
        },
      ],
  })],
})
export class AppModule {}
