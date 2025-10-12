import { useState } from 'react';
import { http } from '../../api/http';
import { type Transaction } from './types';

export default function CreateTransactionForm({ onCreated }: { onCreated: ()=>void }) {
  const [amount, setAmount] = useState<number>(10);
  const [currency, setCurrency] = useState<'EUR'|'USD'>('EUR');
  const [status, setStatus] = useState<'PENDING'|'PAID'|'FAILED'>('PENDING');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await http.post<Transaction>('/transactions', { amount, currency, status });
      onCreated();
    } finally { setLoading(false); }
  };

  return (
    <div className="flex gap-2">
      <input type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} className="border rounded-lg p-2 w-28" />
      <select value={currency} onChange={e=>setCurrency(e.target.value as any)} className="border rounded-lg p-2">
        <option>EUR</option>
        <option>USD</option>
      </select>
      <select value={status} onChange={e=>setStatus(e.target.value as any)} className="border rounded-lg p-2">
        <option>PENDING</option>
        <option>PAID</option>
        <option>FAILED</option>
      </select>
      <button onClick={submit} disabled={loading} className="bg-black text-white rounded-lg px-3">Créer</button>
    </div>
  );
}