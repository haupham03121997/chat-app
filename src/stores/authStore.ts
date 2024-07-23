import { create } from 'zustand'

import { CurrentUser } from '@interfaces/user.interface'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils'

interface AuthStore {
  user: CurrentUser | null
  setUser: (user: CurrentUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getLocalStorage<CurrentUser>('currentUser'),
  setUser: (user) => {
    setLocalStorage('currentUser', user)
    set({ user })
  },
  logout: () => {
    set({ user: null })
    removeLocalStorage('currentUser')
  }
}))
