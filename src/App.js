import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StripeContainer from './components/payment/StripeContainer';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { getUserEmail } from './util/FetchDataHelper';
import { useEffect, useState } from 'react';
import { FetchUserDataFromDb } from './util/FetchDataHelper';
import { LoadingOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const [item, setItem] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  
  useEffect(() => {
    getUserEmail(setUserEmail);
    FetchUserDataFromDb(setUserData, setLoading, setError); // fetching user data from DB
  },[])

  return (
      <>    
        {
          error? <h1><QuestionCircleTwoTone style={{ fontSize: 40 }} /> Sorry, we cannot fetch user data! Try again </h1> :
            isLoading === true? <LoadingOutlined style={{ fontSize: 50, marginTop: "20px" }} className="loadCircle"/>
              :
              <BrowserRouter>
                <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                  <div className="App">
                    <div className="content" onClick={()=> setActiveMenu(false)}>
                      <Routes>
                        <Route exact path="/" element={<Home userData={userData} error={error} isLoading={isLoading} userEmail={userEmail}/>} />
                        <Route exact path="/newitems" element={ <Newitems/>} />
                        <Route exact path="/items/:param" element= { <ItemDetails item={item} setItem={setItem}/>} />
                        <Route exact path="/items" element = {<Items />} />
                        <Route exact path="/updateItem/:param" element = { <UpdateItem/>} />
                        <Route exact path="/signup" element = { <Signup />} />
                        <Route exact path="/login" element = { <Login/>} /> 
                        <Route exact path="/payment/:param" element = { <StripeContainer item={item} setItem={setItem} userEmail={userEmail} userData={userData}/>} />
                      </Routes>
                    </div> 
                  </div>
                <Footer />
              </BrowserRouter>
        }
      </>
  );
}

export default App;

