import React, {useRef, useState} from 'react';
import { signup, useAuth, logout, login } from './firebase';


function UserAuthentic() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useAuth();

    const handleSignUp = async () => {
        setIsLoading(true);
        try{
            await signup(emailRef.current.value, passwordRef.current.value);
        }
        catch(error){
            console.log(error.message);
        }
        setIsLoading(false);
        
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try
        {
            await logout();
        }
        catch(error){
            console.log(error.message);
        }
        setIsLoading(false);
    }

    const handleLogIn = async () => {
        setIsLoading(true);
        try{
            await login(emailRef.current.value, passwordRef.current.value);
        }
        catch(error){
            console.log(error.message);
        }
        setIsLoading(false);
    }

    const changeName = (e) => {
        const value = e.target.value;
        setName(value)
    }

    return (
        <div className='authStyles'>
            {name? <p> Wellcome {name} !!</p> : ""}
            <div className='inputAuth'>
                <input type="text" placeholder='Full Name' onChange={e => changeName(e)}/>
                <input ref={emailRef} type="email" placeholder='Email'/>
                <input ref={passwordRef} type ="password" placeholder='Password'/>
            </div>
            <button disabled={isLoading || currentUser } onClick={handleSignUp}>Sign Up</button>

            <button disabled={isLoading || !currentUser} onClick={handleLogout}>Log Out</button>

            <button disabled={isLoading || currentUser} onClick={handleLogIn}>Log In</button>
        </div>
  )
}


export default  UserAuthentic;
