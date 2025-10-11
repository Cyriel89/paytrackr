import { CreateTransactionUseCase } from './CreateTransactionUseCase';
import { TransactionDomainService } from '../../../domain/transactions/services/TransactionDomainService';
import { ITransactionRepository } from '../../../domain/transactions/ports/TransactionRepository';
import { Currency, TransactionStatus } from '../../../domain/transactions/entities/TransactionEntity';

class InMemoryTxRepo implements ITransactionRepository {
    data: any[] = [];
    async findAll() { return this.data; }
    async create(input: any) {
        const row = { id: this.data.length + 1, createdAt: new Date(), ...input };
        this.data.push(row);
        return row;
    }
}

describe('CreateTransactionUseCase (unit, no DB)', () => {
    it('crée une transaction valide et la retourne', async () => {
        const repo = new InMemoryTxRepo();
        const domain = new TransactionDomainService();
        // @ts-ignore: on instancie direct sans DI pour unitaire
        const usecase = new CreateTransactionUseCase(repo, domain);

        const res = await usecase.execute({
        userId: 1, amount: 10, currency: Currency.EUR, status: TransactionStatus.PENDING
        });

        expect(res.id).toBe(1);
        expect(repo.data).toHaveLength(1);
        expect(repo.data[0].userId).toBe(1);
    });

    it('rejette amount <= 0 (règle métier)', async () => {
        const repo = new InMemoryTxRepo();
        const domain = new TransactionDomainService();
        // @ts-ignore
        const usecase = new CreateTransactionUseCase(repo, domain);

        try {
            await usecase.execute({
            userId: 1,
            amount: 0, // <= 0 -> doit échouer
            currency: Currency.EUR,
            status: TransactionStatus.PENDING,
            });
            // si on arrive ici, c'est un échec
            fail('Expected execute() to throw on amount <= 0');
        } catch (e: any) {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toMatch('Amount must be > 0');
        }
    });
});