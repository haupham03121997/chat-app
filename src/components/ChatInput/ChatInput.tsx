import AttachmentIcon from '@mui/icons-material/Attachment'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import SendIcon from '@mui/icons-material/Send'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'

const ChatInput = () => {
  return (
    <Box>
      <Divider />
      <Stack direction='row' width={1} p={2.75} sx={{ backgroundColor: '#1e1e1e' }}>
        <IconButton size='large' sx={{ backgroundColor: '#eef5b5' }}>
          <AttachmentIcon fontSize='small' sx={{ color: 'black' }} />
        </IconButton>
        <InputBase sx={{ flex: 1, px: 2 }} multiline maxRows={3} placeholder='Write a messages for...' />
        <Stack direction='row' spacing={1}>
          <IconButton size='large'>
            <SentimentSatisfiedAltIcon fontSize='small' />
          </IconButton>
          <IconButton size='large'>
            <KeyboardVoiceIcon fontSize='small' />
          </IconButton>
          <IconButton size='large' sx={{ background: 'rgba(255, 255, 255, 0.08)' }}>
            <SendIcon fontSize='small' />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ChatInput
