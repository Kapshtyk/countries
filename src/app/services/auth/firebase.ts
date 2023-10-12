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
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'countries-78568.firebaseapp.com',
  projectId: 'countries-78568',
  storageBucket: 'countries-78568.appspot.com',
  messagingSenderId: '591877595402',
  appId: '1:591877595402:web:e0aa91cb71f165adb01af3'
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
