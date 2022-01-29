// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword ,onAuthStateChanged, 
  signOut, signInWithEmailAndPassword} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_eZeYsaJw3ad0SRMZWIBmC2LJ2pUiKxs",
  authDomain: "loginoutproject-37aa3.firebaseapp.com",
  projectId: "loginoutproject-37aa3",
  storageBucket: "loginoutproject-37aa3.appspot.com",
  messagingSenderId: "66406220723",
  appId: "1:66406220723:web:66d6e74405d780f71901c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signup=(email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
    
}

export const useAuth = ()=>{
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user=>setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
} 

export const logout = () => {
  return signOut(auth)
}


export const login =(email, password)=>{
  return signInWithEmailAndPassword(auth, email, password);
  
}