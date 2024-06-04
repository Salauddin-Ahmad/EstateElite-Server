import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

import axios from 'axios'
import auth from './firebase.config'
import useAxiosPublic from '../hook/useAxiosPublic'

export const AuthContext = createContext(null)


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

//   const resetPassword = email => {
//     setLoading(true)
//     return sendPasswordResetEmail(auth, email)
//   }

  const logOut = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    })
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
  const axiosPublic = useAxiosPublic();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {

        // get token and store client
        const userInfo = {email: currentUser.email,   displayName: currentUser.displayName, }
        axiosPublic.post('jwt', userInfo)
         .then((res) => {
            console.log(res.data);
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          })
      } else {
        localStorage.removeItem('access-token')
        setLoading(false);
      }

      
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    setUser
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider