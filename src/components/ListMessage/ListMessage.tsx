import Stack from '@mui/material/Stack'
import MessageItem from './MessageItem'

const ListMessage = () => {
  return (
    <Stack direction='column' spacing={2} p={1}>
      {Array.from({ length: 10 }).map((_, index) => (
        <MessageItem key={index} />
      ))}
    </Stack>
  )
}

export default ListMessage
