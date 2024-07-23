import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import { grey } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'

import { authApi } from '@libs/firebase/authenticate'
import { useAuthStore } from '@stores/authStore'

const AvatarSetting = () => {
  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => logout()
  })
  const { user, logout } = useAuthStore()

  const handleLogout = () => logoutMutate()

  return (
    <Stack p={3} direction='row' justifyContent='space-between' alignItems='center' sx={{ backgroundColor: '#1e1e1e' }}>
      <Stack direction='row' spacing={1}>
        <Avatar src={user?.photoURL || ''} />
        <Stack height='100%' justifyContent='space-between'>
          <Typography variant='body2' fontWeight={600}>
            {user?.displayName || user?.email}
          </Typography>
          <Typography fontSize={12} color={grey[700]} pt={0.1}>
            View Profile
          </Typography>
        </Stack>
      </Stack>
      <IconButton disabled={isPending} onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  )
}

export default AvatarSetting
