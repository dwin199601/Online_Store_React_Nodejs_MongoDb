import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth } from "../components/authentication/firebase";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure();

const noUserMessage = () => {
  toast.error("You must register to proceed!!", { position: toast.POSITION.TOP_RIGHT, autoClose: 6000 });
}

 export const CheckIfUserRegistered = (path) => {
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(()=>{
        try{
          if(loading){
          }
          if(user){
          history.push(path);
          }
         
        }
        catch(error){
          console.log(error.message)
        }
        },[user, loading]);
}

export const IfUserIsntRegistered = (path) => {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(()=>{
    try{
      if(loading){
      }
      if(!user){
      noUserMessage()
      history.push(path);
      }
     
    }
    catch(error){
      console.log(error.message)
    }
    },[user, loading]);
 
}