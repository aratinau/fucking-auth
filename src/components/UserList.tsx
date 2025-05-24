import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../lib/fetcher'

export default function UserList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['/users'/*, { role: 'admin' }*/],
    queryFn: fetcher,
  })

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur: {error.message}</p>

  return (
    <ul>
      {data['hydra:member'].map(user => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  )
}
