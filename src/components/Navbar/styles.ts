import { styled } from '@mui/material/styles'

interface DotProps {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

const Dot = styled('div')<DotProps>(({ theme, color = 'success' }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  // Use the color prop to dynamically set the backgroundColor
  backgroundColor: theme.palette[color].main
}))

export default Dot
