import { useEffect, useState } from 'react'

type Stats = {
  count: number
  byStatus: Record<string, number>
  byCurrency: Record<string, number>
}

export default function StatsCard() {
  console.log('StatsCard mounted');
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:8000/stats/summary')
        if (!res.ok) throw new Error('Erreur API Symfony')
        const data = await res.json()
        setStats(data)
      } catch (e: any) {
        setError(e.message)
      }
    }
    load()
  }, [])

  if (error) return <div className="text-sm text-red-600">{error}</div>
  if (!stats) return <div className="text-sm text-gray-500">Chargement...</div>

  return (
    <div className="bg-white text-black rounded-xl shadow-sm p-4 text-sm">
      <h2 className="font-semibold mb-2">Statistiques</h2>
      <div>Total transactions : <strong>{stats.count}</strong></div>
      <div className="mt-2">
        <div className="font-medium">Par statut :</div>
        {Object.entries(stats.byStatus).map(([status, value]) => (
          <div key={status}>{status} : {value}</div>
        ))}
      </div>
      <div className="mt-2">
        <div className="font-medium">Par devise :</div>
        {Object.entries(stats.byCurrency).map(([currency, value]) => (
          <div key={currency}>{currency} : {value}</div>
        ))}
      </div>
    </div>
  )
}