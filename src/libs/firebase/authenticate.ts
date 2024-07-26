import { CurrentUser } from '@interfaces/user.interface'
import { auth, database } from '@libs/firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { uploadApi } from './upload'

export const authApi = {
  fetchUser: async (uid: string) => {
    try {
      const docRef = doc(database, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return docSnap.data() as CurrentUser
      } else {
        throw Error('User not found')
      }
    } catch (error: any) {
      throw Error(error.message)
    }
  },
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
  register: async (email: string, password: string, displayName: string, file: File) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const url = await uploadApi.upload(file)

      if (response.user) {
        await setDoc(doc(database, 'users', response.user.uid), {
          fullName: displayName,
          email: response.user.email,
          id: response.user.uid,
          avatar: url || '',
          blocked: []
        })
        await setDoc(doc(database, 'userChats', response.user.uid), {
          chats: []
        })
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
