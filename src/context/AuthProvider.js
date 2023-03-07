import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from "../firebase/firebase.config";
import Loading from '../components/Loading/Loading';

// create context and export 
export const AuthContext = createContext();
// firebase auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Google Provider;
  const googleProvider = new GoogleAuthProvider();

  // email and password base auth create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };
  // update user profilePic and Name 
  const updateUser = (userInfo) => {
    //
    return updateProfile(auth.currentUser, userInfo);
  }

  // email and password base login
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google base sign in ;
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign OUt system
  const logOut = () => {
    setLoading(true)
    localStorage.removeItem('accessToken');
    return signOut(auth);
  }

  // user auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // console.log('user Observer');
      setUser(currentUser);
      setLoading(false);
    })
    return () => unsubscribe();
  }, [])




  // auth value here for context 
  const authInfo = {
    user,
    setUser,
    setLoading,
    loading,
    googleSignIn,
    signIn,
    updateUser,
    createUser,
    logOut,


  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

