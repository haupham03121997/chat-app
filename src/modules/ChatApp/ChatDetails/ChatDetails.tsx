import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'

import { ChatInput } from '@components/ChatInput'
import { Navbar } from '@components/Navbar'

interface ChatMessageProps {
  isCurrentUser: boolean
}

const ChatMessage = styled(Box)<ChatMessageProps>(({ theme, isCurrentUser }) => ({
  background: isCurrentUser ? '#eef5b5' : '#1e1e1e',
  borderRadius: 16,
  color: isCurrentUser ? '#242424' : '#a2a2a2',
  fontSize: 14,
  width: 'fit-content',
  padding: theme.spacing(1.5) + ' ' + theme.spacing(3),
  '& .MuiInputBase-input': {
    fontSize: 14,
    transition: theme.transitions.create('width'),
    paddingLeft: theme.spacing(1)
  }
}))

const ChatDetails = () => {
  const messageEl = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const target = messageEl.current
    if (target) {
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const target = messageEl.current
          if (target) {
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
          }
        }
      })
    })

    if (messageEl.current) {
      observer.observe(messageEl.current, { childList: true })
      handleScroll()
    }

    return () => observer.disconnect()
  }, [])
  const mockData = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 2,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 3,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 4,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 5,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 6,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 7,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 8,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 9,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 10,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 11,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    },
    {
      id: 12,
      name: 'Jane Doe',
      message: 'Hi',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 2
    },
    {
      id: 13,
      name: 'John Doe',
      message: 'Hello',
      time: '12:00 PM',
      avatar: 'https://randomuser',
      userID: 1
    }
  ]
  return (
    <Stack justifyContent='space-between' height='100vh'>
      <Box>
        <Navbar />
        <Divider />
      </Box>
      <Box ref={messageEl} style={{ flex: 1 }} sx={{ overflowY: 'scroll' }}>
        {mockData.map((data) => {
          const isCurrentUser = data.userID === 1
          return (
            <Stack key={data.id} px={3} py={1}>
              <Stack spacing={1} textAlign={isCurrentUser ? 'end' : 'start'}>
                <Stack direction='row' justifyContent={isCurrentUser ? 'end' : 'start'} spacing={2}>
                  <ChatMessage isCurrentUser={isCurrentUser}>{data.message}</ChatMessage>
                </Stack>
                <Typography variant='caption' color='textSecondary'>
                  {data.time}
                </Typography>
              </Stack>
            </Stack>
          )
        })}
      </Box>
      <Box>
        <ChatInput />
      </Box>
    </Stack>
  )
}

export default ChatDetails
