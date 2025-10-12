export type Transaction = {
    id: number;
    userId: number;
    amount: number;
    currency: 'EUR' | 'USD';
    status: 'PENDING' | 'PAID' | 'FAILED';
    createdAt: string;
}