import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import Dot from './styles'

interface UserProfileProps {
  isActive: boolean
}
const UserProfile: FC<UserProfileProps> = ({ isActive }) => {
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Avatar sizes='large' sx={{ width: 50, height: 50 }} />
      <Box>
        <Typography fontWeight={600}>John Doe</Typography>

        <Stack direction='row' spacing={1} alignItems='center'>
          <Dot color={isActive ? 'success' : 'error'} />
          <Typography fontSize={12} color={grey[700]}>
            {isActive ? 'Active now' : 'Offline'}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  )
}

export default UserProfile
