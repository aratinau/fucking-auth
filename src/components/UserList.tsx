import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../lib/fetcher'
import { useState } from 'react'

interface User {
  id: string
  email: string
}

export default function UserList() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const { data, error, isLoading } = useQuery({
    queryKey: ['/users', { 'order[id]': order }],
    queryFn: fetcher,
  })

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur: {error.message}</p>

  return (
    <div>
      <button 
        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Trier par ID {order === 'asc' ? '↑' : '↓'}
      </button>
      <ul>
        {data['hydra:member'].map((user: User) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  )
}
