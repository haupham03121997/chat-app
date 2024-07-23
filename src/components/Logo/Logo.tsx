import BlurOnIcon from '@mui/icons-material/BlurOn'
import { PATH } from '@routes/path'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <>
      <BlurOnIcon fontSize='large' sx={{ cursor: 'pointer' }} onClick={() => navigate(PATH.HOME)} />
    </>
  )
}

export default Logo
