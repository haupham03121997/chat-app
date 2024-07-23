import { useAuthStore } from '@stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from './path'

const ProtectedRoute = () => {
  const { user } = useAuthStore()
  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export default ProtectedRoute
