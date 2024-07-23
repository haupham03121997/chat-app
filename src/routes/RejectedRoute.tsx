import { useAuthStore } from '@stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from './path'

const RejectedRoute = () => {
  const { user } = useAuthStore()
  return !user ? <Outlet /> : <Navigate to={PATH.HOME} />
}

export default RejectedRoute
