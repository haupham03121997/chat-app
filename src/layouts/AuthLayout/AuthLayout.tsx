import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subTitle?: string
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title = 'Welcome back!', subTitle }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
      <Box maxWidth={500} minWidth={500} p={4} borderRadius={4} sx={{ backgroundColor: '#1e1e1e' }}>
        <Typography textAlign='center' mb={2}>
          <img src='./vite.svg' alt='logo' width={50} />
        </Typography>
        <Typography textAlign='center' component='h5' fontWeight={600} fontSize={28} mb={2}>
          {title}
        </Typography>
        {subTitle && (
          <Typography textAlign='center' fontSize={14} color='text.secondary' mb={4}>
            {subTitle}
          </Typography>
        )}
        {children}
        <Outlet />
      </Box>
    </Box>
  )
}

export default AuthLayout
