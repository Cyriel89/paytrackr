import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'admin@paytrackr.local',   password: 'Admin!123',   role: 'ADMIN' },
    { email: 'analyst@paytrackr.local', password: 'Analyst!123', role: 'ANALYST' },
    { email: 'viewer@paytrackr.local',  password: 'Viewer!123',  role: 'VIEWER' },
  ];
  for (const u of users) {
    const hash = await argon2.hash(u.password);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { email: u.email, password: hash, role: u.role as any },
    });
  }
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