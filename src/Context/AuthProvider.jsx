import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [booking,setBooking] = useState({})
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const upDateUser = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };
  const logInUser = (email, passward) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passward);
  };

  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    setLoading(true)
    return signOut(auth);
  };

  const userInfo = {
    user,
    setUser,
    loading,
    registerUser,
    logInUser,
    upDateUser,
    logout,
    googleLogin,
    setLoading,
   booking,
   setBooking,

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
