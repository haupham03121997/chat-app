import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Box, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { grey, pink } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import { PATH } from '@routes/path'
import { useNavigate } from 'react-router-dom'

interface MessageItem {
  message: string
  timestamp: string
  user: string
  avatar: string
}

const MessageItem = () => {
  const navigate = useNavigate()
  return (
    <Stack
      direction='row'
      spacing={1.5}
      alignItems='center'
      p={2}
      borderRadius={2}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#1e1e1e',
          transition: 'all 0.3s ease-in-out'
        }
      }}
      onClick={() => navigate(`${PATH.MESSAGE_DETAIL}/1`)}
    >
      <Avatar sizes='large' sx={{ width: 50, height: 50 }} />
      <Stack spacing={1} justifyContent='space-between' overflow='hidden'>
        <Box fontWeight={600}>John Doe</Box>
        <Typography
          color={grey[700]}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 0.5
          }}
          noWrap
          fontSize={14}
        >
          <DoneAllIcon sx={{ fontSize: 14 }} /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          perspiciatis.
        </Typography>
      </Stack>
      <Stack sx={{ minWidth: 35 }} spacing={1} justifyContent='space-between' alignItems='end' flex={1}>
        <Typography fontSize={12} color={grey[700]}>
          12:00
        </Typography>
        <Stack justifyContent='flex-end'>
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              color: '#fffff',
              fontSize: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pink[400]
            }}
          >
            <Typography fontSize={10}>2</Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default MessageItem
