import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ActionIcons from './ActionIcons'
import UserProfile from './UserProfile'

const Navbar = () => {
  const isActive = true
  return (
    <AppBar position='static'>
      <Toolbar sx={{ paddingY: 2, backgroundColor: '#1e1e1e' }}>
        <UserProfile isActive={isActive} />
        <ActionIcons />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
