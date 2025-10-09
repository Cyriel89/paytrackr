import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const seedTransactions = [
    { userId: 1, amount: 125.5, currency: 'EUR', status: 'PAID' },
    { userId: 1, amount: 79.9, currency: 'USD', status: 'FAILED' },
    { userId: 2, amount: 310.0, currency: 'EUR', status: 'PENDING' },
    { userId: 3, amount: 55.25, currency: 'EUR', status: 'PAID' },
    { userId: 2, amount: 600.0, currency: 'USD', status: 'PAID' },
    { userId: 1, amount: 220.1, currency: 'EUR', status: 'FAILED' },
    { userId: 3, amount: 45.0, currency: 'USD', status: 'PENDING' },
    { userId: 2, amount: 90.9, currency: 'EUR', status: 'PAID' },
    { userId: 3, amount: 300.0, currency: 'EUR', status: 'PAID' },
    { userId: 1, amount: 150.0, currency: 'USD', status: 'PENDING' }
  ];
  for (const t of seedTransactions) {
    await prisma.transaction.create({ data: t });
  }
}

main().finally(() => prisma.$disconnect());