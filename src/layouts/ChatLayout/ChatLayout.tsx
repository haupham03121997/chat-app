import SideBar from '@components/Sidebar/Sidebar'
import { Drawer } from '@mui/material'
import { styled } from '@mui/system'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ChatLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100vw'
}))

const ChatLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '380px'
  }
}))

const ChatLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
})

const ChatLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100vh',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch'
})

interface ChatLayoutProps {
  children: React.ReactNode
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return (
    <ChatLayoutRoot>
      <Drawer
        elevation={12}
        anchor='left'
        open
        PaperProps={{
          sx: {
            height: 'calc(100%) !important',
            width: 380
            // backgroundColor: "#1e1e1e"
          }
        }}
        variant='persistent'
      >
        <SideBar />
      </Drawer>
      <ChatLayoutWrapper>
        <ChatLayoutContainer>
          <ChatLayoutContent>
            {children}
            <Outlet />
          </ChatLayoutContent>
        </ChatLayoutContainer>
      </ChatLayoutWrapper>
    </ChatLayoutRoot>
  )
}

export default ChatLayout
