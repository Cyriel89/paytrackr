import { Currency, TransactionStatus } from '../../transactions/entities/TransactionEntity';

export class TransactionDomainService {
  validateCreate(input: {
    amount: number;
    currency: Currency;
    status: TransactionStatus;
  }) {
    // 1) Montant
    if (typeof input.amount !== 'number' || Number.isNaN(input.amount) || input.amount <= 0) {
      throw new Error('Amount must be > 0');
    }
    // 2) Devise
    if (!Object.values(Currency).includes(input.currency)) {
      throw new Error('Unsupported currency');
    }
    // 3) Statut
    if (!Object.values(TransactionStatus).includes(input.status)) {
      throw new Error('Invalid status');
    }

    return true; // OK
  }
}