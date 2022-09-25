import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import StripeContainer from './components/payment/StripeContainer';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { getUserEmail} from './util/FetchDataHelper';
import { useEffect, useState } from 'react';
import { FetchUserDataFromDb } from './util/FetchDataHelper';
import { LoadingOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import ContactForm from './components/contactForm';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const [item, setItem] = useState({});
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [user, setUser] = useState({
    fistName: "",
    lastName: "",
    userId: "",
    userImage: "",
  })
  const [userEmail, setUserEmail] = useState(null);
  const [products, setProducts] = useState([]);
  getUserEmail(setUserEmail);

  useEffect(() => {
    FetchUserDataFromDb( setUser, userEmail, setError);
  },[userEmail])
   
  return (
      <>    
        {
          error?  <div className='uploadError'>
                    <QuestionCircleTwoTone style={{ fontSize: 40 }} /> 
                    <h1>Sorry, we cannot upload user data! Try again or contact <a href="mailto:dwin13672@gmail.com" class="email_contact">admin</a></h1> 
                  </div> :
                  <BrowserRouter>
                    <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                      <div className="App">
                        <div  onClick={()=> setActiveMenu(false)}>
                          <Routes>
                            <Route exact path="/" element={
                              <Home 
                                products={products} 
                                setProducts={setProducts} 
                                user={user}
                                setUser={setUser}
                                setError={setError} 
                                error={error} 
                                userEmail={userEmail}
                              />} 
                            />
                            <Route exact path="/newitems" element={ <Newitems user={user}/>} />
                            <Route exact path="/items/:param" element= { <ItemDetails item={item} setItem={setItem} userEmail={userEmail} user={user}/> } />
                            <Route exact path="/items" element = {<Items error={error} setError={setError} products = {products} setProducts={setProducts} user={user}/>} />
                            <Route exact path="/updateItem/:param" element = { <UpdateItem/>} />
                            <Route exact path="/signup" element = { <Signup />} />
                            <Route exact path="/login" element = { <Login/>} /> 
                            <Route exact path="/payment/:param" element = { <StripeContainer item={item} setItem={setItem} userEmail={userEmail} user={user}/>} />
                            <Route exact path="/contact" element={<ContactForm/>} />
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

