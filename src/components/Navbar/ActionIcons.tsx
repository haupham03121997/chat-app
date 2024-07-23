import MoreVertIcon from '@mui/icons-material/MoreVert'
import PhoneIcon from '@mui/icons-material/Phone'
import VideocamIcon from '@mui/icons-material/Videocam'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

const ActionIcons = () => {
  return (
    <Stack direction='row' spacing={2} sx={{ marginLeft: 'auto' }}>
      <IconButton>
        <VideocamIcon />
      </IconButton>
      <IconButton>
        <PhoneIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Stack>
  )
}

export default ActionIcons
