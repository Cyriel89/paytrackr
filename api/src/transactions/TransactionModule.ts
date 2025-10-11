import { Module } from '@nestjs/common';
import { PresentationModule } from '../presentation/PresentationModule';

@Module({
    imports: [PresentationModule],
})
export class TransactionModule {}