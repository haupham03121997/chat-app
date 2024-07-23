import { CurrentUser } from '@interfaces/user.interface'
import { auth } from '@libs/firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const authApi = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response.user as CurrentUser
    } catch (error: any) {
      const errors: Record<string, string> = {
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Wrong password',
        'auth/too-many-requests': 'Too many requests',
        'auth/invalid-email': 'Invalid email',
        'auth/invalid-credential': 'Email or password is incorrect'
      }
      throw Error(errors[error.code] || error.message)
    }
  },
  register: async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response.user) {
        // upload user data to firestore
      }
      return response.user as CurrentUser
    } catch (error: any) {
      const errors: Record<string, string> = {
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Wrong password',
        'auth/too-many-requests': 'Too many requests',
        'auth/invalid-email': 'Invalid email',
        'auth/invalid-credential': 'Email or password is incorrect'
      }
      throw Error(errors[error.code] || error.message)
    }
  },
  logout: async () => {
    await signOut(auth)
  }
}
