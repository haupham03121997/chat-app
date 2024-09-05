import { doc, setDoc } from 'firebase/firestore'
import { database } from './config'

export const documentApi = {
  setDoc: async <T = any>(collection: string, uuID: string, data: T) => {
    try {
      const response = await setDoc(doc(database, collection, uuID) as any, data)
      return response
    } catch (error: any) {
      throw Error(error.message)
    }
  }
}
