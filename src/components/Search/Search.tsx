import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material'
import InputBase from '@mui/material/InputBase'

const SearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  borderRadius: 6,
  width: '100%',
  padding: theme.spacing(1) + ' ' + theme.spacing(2),
  '& .MuiInputBase-input': {
    fontSize: 14,
    transition: theme.transitions.create('width'),
    paddingLeft: theme.spacing(1)
  }
}))

const Search = () => {
  return <SearchInput startAdornment={<SearchIcon fontSize='small' />} placeholder='Search...' />
}

export default Search
