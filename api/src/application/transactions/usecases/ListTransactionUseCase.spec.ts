import { ListTransactionUseCase } from './ListTransactionUseCase';
import { ITransactionRepository } from '../../../domain/transactions/ports/TransactionRepository';

class InMemoryTxRepo implements ITransactionRepository {
  constructor(public data: any[] = []) {}
  findAll() { return Promise.resolve(this.data); }
  create(data: any): Promise<any> {
    return Promise.reject(new Error('not used'));
  }
}


describe('ListTransactionUseCase (unit, no DB)', () => {
    it('retourne la liste des transactions', async () => {
        const repo = new InMemoryTxRepo([{ id:1 }, { id:2 }]);
        const usecase = new ListTransactionUseCase(repo);

        const result = await usecase.execute();
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
    });
});