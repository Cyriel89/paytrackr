import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';

@Injectable()
export class TransactionsService {
    constructor(private readonly prisma: PrismaService) {}

    // GET /transactions
    async findAll() {
        return this.prisma.transaction.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    // POST /transactions
    async create(data: { userId: number; amount:number; currency: string; status:string}) {
        return this.prisma.transaction.create({
             data
        });
    }
}