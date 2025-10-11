import { TransactionDomainService } from './TransactionDomainService';
import { Currency, TransactionStatus } from '../../transactions/entities/TransactionEntity';

describe('TransactionDomainService', () => {
  const service = new TransactionDomainService();

  it('accepte une transaction valide', () => {
    expect(() => service.validateCreate({
      amount: 100,
      currency: Currency.EUR,
      status: TransactionStatus.PAID
    })).not.toThrow();
  });

  it('rejette un montant <= 0', () => {
    expect(() => service.validateCreate({
      amount: 0,
      currency: Currency.EUR,
      status: TransactionStatus.PENDING
    })).toThrow(/Amount/);
  });

  it('rejette une devise invalide', () => {
    expect(() => service.validateCreate({
      amount: 50,
      currency: 'ABC' as Currency,
      status: TransactionStatus.PAID
    })).toThrow(/currency/i);
  });

  it('rejette un status non supporté', () => {
    expect(() => service.validateCreate({
      amount: 10,
      currency: Currency.EUR,
      status: 'UNKNOWN' as TransactionStatus
    })).toThrow(/status/i);
  });
});