export class TransactionDomainService {
  validateCreate(input: { amount: number; currency: string; status: string }) {
    if (typeof input.amount !== 'number' || input.amount <= 0) {
      throw new Error('Amount must be > 0');
    }
    if (!['EUR','USD'].includes(input.currency)) {
      throw new Error('Unsupported currency');
    }
    if (!['PENDING','PAID','FAILED'].includes(input.status)) {
      throw new Error('Invalid status');
    }
    return true;
  }
}