import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AvatarSetting } from '@/components/AvatarSetting'
import { ListMessage } from '@/components/ListMessage'
import { Logo } from '@/components/Logo'
import { Search } from '@/components/Search'

const SideBar = () => {
  return (
    <Stack height='100vh' overflow='hidden'>
      <Box px={3} py={2.9} sx={{ backgroundColor: '#1e1e1e' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Logo />
          <IconButton>
            <AddIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <Box width='100%' p={3}>
        <Search />
      </Box>

      <Typography px={3} variant='h6' fontWeight={600} color={grey[300]} mb={2}>
        Messages
      </Typography>
      <Box flex={1} sx={{ overflowY: 'auto' }}>
        <ListMessage />
      </Box>
      <Divider />
      <AvatarSetting />
    </Stack>
  )
}

export default SideBar
