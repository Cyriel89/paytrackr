export enum Currency {
    EUR = 'EUR',
    USD = 'USD'
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
}

export class Transaction {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly amount: number,
        public readonly currency: Currency,
        public readonly status: TransactionStatus,
        public readonly createdAt: Date,
    ) {}
}