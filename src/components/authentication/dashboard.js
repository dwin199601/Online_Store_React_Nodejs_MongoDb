import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router';
import './dashboard.css';
import { auth, db, logout, loginError } from "./firebase";
import { successfullMessage } from '../../util/FetchDataHelper';
import { query, collection, getDocs, where } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { Spin, Alert } from 'antd';

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [load, setLoad] = useState(false);
    const [name, setName] = useState([]);
    const history = useHistory();

    const fetchUserName = async () => {
        try {
          setLoad(true);
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          loginError("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return history.push("/");
        fetchUserName();
    }, [user, loading]);

    const goStore = ()=>{
        return history.push("/items");
    }

    const deleteCurrentUser = () =>{
      const user = auth.currentUser;
      deleteUser(user).then(()=>{
        successfullMessage("User was deleted!!")
      }).catch((error)=>{
        console.log(error.message);
        //loginError("Something went wrong, try to re-authenticate")
      })
    }

  return (
    <div className="dashboard">
        {
          load?
          <>
          <div className='dashText'>
          <p>Account Details of {name}</p>
          </div>
          <div className="dashboard__container">
         <h3>User Details:</h3>
         <div>Name: <h3 style={{fontSize: "18px", color: "rgb(7, 7, 134)"}}>{name}</h3></div>
         <div>Email: <a href={`mailto:${user?.email}`} className='emailStyles'>{user?.email}</a></div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>

         <button className="dashboard__btn_store" onClick={goStore}>
          Open Store
         </button>
         <button className="dashboard__btn_delete" onClick={deleteCurrentUser}>Delete Account</button>

        </div>
        </>
        :
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        }
        
    </div>
  )
}

export default Dashboard;
