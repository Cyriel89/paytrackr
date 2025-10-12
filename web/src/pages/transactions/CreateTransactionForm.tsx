import { useState } from 'react';
import { http } from '../../api/http';
import { type Transaction } from './types';

export default function CreateTransactionForm({ onCreated }: { onCreated: ()=>void }) {
    const [amount, setAmount] = useState<number>(10);
    const [currency, setCurrency] = useState<'EUR'|'USD'>('EUR');
    const [status, setStatus] = useState<'PENDING'|'PAID'|'FAILED'>('PENDING');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const submit = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await http.post<Transaction>('/transactions', { amount, currency, status });
            setMessage('Transaction créée ✅');
            setAmount(10);
            setCurrency('EUR');
            setStatus('PENDING');
            onCreated();
        } catch {
            setError('Erreur lors de la création de la transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gap-2 flex items-center my-2">
            <input type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} className="border rounded-lg p-2 h-10 w-28" />
            <select value={currency} onChange={e=>setCurrency(e.target.value as any)} className="border rounded-lg p-2 h-10">
                <option>EUR</option>
                <option>USD</option>
            </select>
            <select value={status} onChange={e=>setStatus(e.target.value as any)} className="border rounded-lg p-2 h-10">
                <option>PENDING</option>
                <option>PAID</option>
                <option>FAILED</option>
            </select>
            <button onClick={submit} disabled={loading} className="bg-black text-white rounded-lg p-0 px-3 h-10">{ loading ? '...' : 'Créer' }</button>
            {message && <p className="border-l-4 border-emerald-500 bg-white/60 text-gray-800 text-sm px-3 py-2 rounded-md">{message}</p>}
            {error && <p className="border-l-4 border-rose-500 bg-white/60 text-gray-800 text-sm px-3 py-2 rounded-md">{error}</p>}
        </div>
    );
}