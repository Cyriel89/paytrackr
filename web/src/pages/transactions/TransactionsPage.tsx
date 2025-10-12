import { useEffect, useState } from 'react';
import { http } from '../../api/http';
import { type Transaction } from './types';
import CreateTransactionForm from './CreateTransactionForm';

export default function TransactionsPage() {
  const [items, setItems] = useState<Transaction[]>([]);

  const load = async () => {
    const { data } = await http.get<Transaction[]>('/transactions');
    setItems(data);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen w-screen grid place-items-center bg-gray-500 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl mr-2 font-semibold">Transactions</h1>
        <CreateTransactionForm onCreated={load} />
      </header>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Devise</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map(tx => (
              <tr key={tx.id} className="text-black border-t">
                <td className="p-3">{tx.id}</td>
                <td className="p-3">{tx.amount.toFixed(2)}</td>
                <td className="p-3">{tx.currency}</td>
                <td className="p-3">{tx.status}</td>
                <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}