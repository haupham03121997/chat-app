import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import useRoutesElement from '@routes/useRoutesElement'
import darkTheme from '@themes/darkTheme'
import { onAuthStateChanged } from 'firebase/auth'

import { CurrentUser } from '@interfaces/user.interface'
import { authApi } from '@libs/firebase/authenticate'
import { auth } from '@libs/firebase/config'
import { useAuthStore } from '@stores/authStore'
import { useEffect } from 'react'
import './App.css'

function App() {
  const element = useRoutesElement()
  const { setUser, logout } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe
  }, [])

  async function initializeUser(user: CurrentUser | null) {
    if (user) {
      const currentUser = await authApi.fetchUser(user.uid)
      console.log('currentUser', currentUser)
      if (currentUser) {
        setUser({ ...currentUser, ...user })
      }
      // setUser({ ...user })

      // // check if provider is email and password login
      // const isEmail = user.providerData.some((provider) => provider.providerId === 'password')

      // console.log({ isEmail })
    } else {
      logout()
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  )
}

export default App
