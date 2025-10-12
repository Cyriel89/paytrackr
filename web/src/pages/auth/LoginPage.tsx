import { useState } from 'react';
import { http } from '../../api/http';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@paytrackr.local');
    const [password, setPassword] = useState('Admin!123');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
        const { data } = await http.post('/auth/login', { email, password });
        localStorage.setItem('token', data.access_token);
        window.location.href = '/transactions';
        } catch (e: any) {
        setError('Identifiants invalides');
        }
    };

    return (
        <div className="min-h-screen w-screen grid place-items-center bg-gray-50 p-6">
            <form onSubmit={onSubmit} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-sm space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Connexion</h1>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <div>
                <label className="block text-sm mb-1">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                <label className="block text-sm mb-1">Mot de passe</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-lg p-2" />
                </div>
                <button className="w-full bg-black text-white rounded-lg py-2">Se connecter</button>
            </form>
        </div>
    );
}