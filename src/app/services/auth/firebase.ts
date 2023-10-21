/// <reference types="cypress" />
import { initializeApp } from 'firebase/app'
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_GOOGLE_API_KEY ||
    (process.env.REACT_APP_ENV === 'test' &&
      Cypress.env('CYPRESS_APP_GOOGLE_API_KEY')),
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN ||
    (process.env.REACT_APP_ENV === 'test' &&
      Cypress.env('CYPRESS_APP_AUTH_DOMAIN')),
  projectId:
    process.env.REACT_APP_PROJECT_ID ||
    (process.env.REACT_APP_ENV === 'test' &&
      Cypress.env('CYPRESS_APP_PROJECT_ID')),
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET ||
    (process.env.REACT_APP_ENV === 'test' &&
      Cypress.env('CYPRESS_APP_STORAGE_BUCKET')),
  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID ||
    Cypress.env('CYPRESS_APP_MESSAGING_SENDER_ID'),
  appId:
    process.env.REACT_APP_APP_ID ||
    (process.env.REACT_APP_ENV === 'test' && Cypress.env('CYPRESS_APP_APP_ID'))
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (
  email: string,
  password: string,
  setError = console.log
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  setError = console.log
) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const user = response.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      email,
      authProvider: 'local'
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}

const logout = async () => {
  try {
    await auth.signOut()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

const toggleFavourites = async (country: string, user: User) => {
  try {
    const q = query(
      collection(db, `users/${user.uid}/favourites`),
      where('country', '==', country)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      await deleteDoc(querySnapshot.docs[0].ref)
    } else {
      await addDoc(collection(db, `users/${user.uid}/favourites`), {
        country
      })
    }
    return await getFavourites(user)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

interface IFavourite {
  country: string
}

const getFavourites = async (user: User) => {
  try {
    const q = query(collection(db, `users/${user.uid}/favourites`))
    const querySnapshot = await getDocs(q)
    const favourites: IFavourite[] = []
    querySnapshot.forEach((doc) => {
      favourites.push(doc.data().country)
    })
    return favourites
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

const clearFavorites = async (user: User) => {
  try {
    const q = query(collection(db, `users/${user.uid}/favourites`))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export {
  auth,
  db,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  toggleFavourites,
  getFavourites,
  clearFavorites
}
