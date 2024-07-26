import { User } from 'firebase/auth'

export interface CurrentUser extends User {
  fullName?: string
  avatar?: string
  blocked?: string[]
}
