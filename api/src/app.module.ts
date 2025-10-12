import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/PresentationModule';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PresentationModule, ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 60,
        limit: 10,
      },
    ],
  })],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}