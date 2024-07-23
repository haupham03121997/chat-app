/* eslint-disable react-refresh/only-export-components */

import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { PATH } from './path'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'

import { AuthLayout } from '@layouts/AuthLayout'
import { ChatLayout } from '@layouts/ChatLayout'

const Welcome = lazy(() => import('@modules/ChatApp/Welcome'))
const ChatDetails = lazy(() => import('@modules/ChatApp/ChatDetails'))

const Login = lazy(() => import('@modules/Auth/Login'))
const Register = lazy(() => import('@modules/Auth/Register'))

const useRoutesElement = () => {
  const elements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<p>Loading..</p>}>
              <ChatLayout>
                <Welcome />
              </ChatLayout>
            </Suspense>
          )
        },
        {
          path: `${PATH.MESSAGE_DETAIL}/:id`,
          element: (
            <Suspense fallback={<p>Loading..</p>}>
              <ChatLayout>
                <ChatDetails />
              </ChatLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <AuthLayout subTitle='Please login to your account'>
                <Login />
              </AuthLayout>
            </Suspense>
          )
        },
        {
          path: PATH.REGISTER,
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <AuthLayout title='Create new account' subTitle='Please fill the form to continue'>
                <Register />
              </AuthLayout>
            </Suspense>
          )
        }
      ]
    }
  ])
  return elements
}

export default useRoutesElement
