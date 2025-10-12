import { useEffect, useState } from 'react';
import { http } from '../../api/http';
import { type Transaction } from './types';
import CreateTransactionForm from './CreateTransactionForm';

export default function TransactionsPage() {
    const [items, setItems] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await http.get<Transaction[]>('/transactions');
            setItems(data);
        } finally {
            setLoading(false);
        }
      };
      useEffect(() => { load(); }, []);
      return (
        <div className="min-h-screen w-screen grid  bg-gray-500 p-6">
            <div className='flex justify-end'>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="justify-end display:flex text-white rounded-lg h-10 py-0">Se déconnecter</button>
            </div>

            <h1 className="text-5xl text-center font-bold">Transactions</h1>
            <CreateTransactionForm onCreated={load} />
     
            {loading && (
                <div className="text-sm text-black">Chargement…</div>
            )}
            {!loading && items.length === 0 && (
                <div className="text-sm text-gray-500">
                    Aucune transaction pour le moment.
                </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-h-[60vh] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-black text-left sticky top-0">
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
                                <td className={`inline-block px-2 py-0.5 mt-3.5 m-2 rounded-full justify-center text-xs font-medium ${tx.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : tx.status === "PAID" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{tx.status}</td>
                                <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}