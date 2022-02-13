import {getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup} from "firebase/auth"
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure();

export const loginError = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER, autoClose: 6000 });
}

const firebaseConfig = {
  apiKey: "AIzaSyAamVRRonskSSCL8RR9MmkRt8fcvRh0TQM",
  authDomain: "authetification-8816b.firebaseapp.com",
  projectId: "authetification-8816b",
  storageBucket: "authetification-8816b.appspot.com",
  messagingSenderId: "936223500186",
  appId: "1:936223500186:web:f3f054a52de48643553c23"
};


/*This will use our config to recognize the project and initialize authentication and database modules.*/
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/*Google authentification */

const googleProvider = new GoogleAuthProvider(); 
const signInWithGoogle = async () => {
  try{
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }   
  }
  catch (err) {
  console.log(err);
  loginError("Opps, something went wrong...");
  }
}

const logInWithEmailAndPassword = async (email, password)=> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }catch (err) {
    console.log(err);
    loginError("Email or Password isn't correct! Try again");
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
  } catch (signUpError ) {
    loginError("This email is already in use");
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }

}
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};












