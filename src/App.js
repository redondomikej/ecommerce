import './App.css';
import {Container} from 'react-bootstrap';

import AppNavbar from './components/Navbar';
import ProductView from './components/ProductView';
import UpdateProduct from './components/adminComponents/UpdateProduct';

import Register from './pages/Register'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Error from './pages/Error';
import Products from './pages/Products';
import ViewCart from './pages/ViewCart';
import Checkout from './pages/Checkout';
import MyOrderHistory from './pages/MyOrderHistory';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/adminPanel/AdminDashboard';
import EntireOrderHistory from './pages/adminPanel/EntireOrderHistory';

import {useState, useEffect} from 'react';

import {UserProvider} from './UserContext';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if user information if properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      // User is logged in
      if(typeof data._id !== "undefined") {
        setUser ({
          id: data._id,
          isAdmin: data.isAdmin
        })
      }
      // User is logged out
      else {
        setUser({
          id: null,
          isAdmin: null
        })
      }

    })
  }, []);

  return (
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          < AppNavbar/>
          <Container id="container">
            <Routes>
              < Route path="/" element={<Home/>}/>
              < Route path="/products" element={<Products/>}/>
              < Route path="/products/:productId" element={<ProductView/>}/>
              < Route path="/login" element={<Login/>}/>
              < Route path="/register" element={<Register/>}/>
              < Route path="/carts/view-cart" element={<ViewCart/>}/>
              < Route path="/orders" element={<Checkout/>}/>
              < Route path="/admin-dashboard" element={<AdminDashboard/>}/>
              < Route path="/order-history-admin" element={<EntireOrderHistory/>}/>
              < Route path="/my-order-history" element={<MyOrderHistory/>}/>
              < Route path="/userprofile" element={<UserProfile/>}/>
              < Route path="/products/update/:productId" element={<UpdateProduct/>}/>
              < Route path="/logout" element={<Logout/>}/>
              < Route path="*" element={<Error />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider> 
    </>
  );
}

export default App;
