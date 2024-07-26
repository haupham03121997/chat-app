import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from './config'

export const uploadApi = {
  upload: async (file: File) => {
    const date = new Date()
    const storageRef = ref(storage, `images/${date.getTime() + file.name}.jpg`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.log({ error })
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            resolve(downloadURL)
          })
        }
      )
    })
  }
}
