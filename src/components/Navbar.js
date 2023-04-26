import UserContext from '../UserContext';
import {Link, NavLink} from 'react-router-dom';
import {useContext} from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppNavbar() {

  const {user} = useContext(UserContext);


  return (
    <Navbar className="py-3 px-md-5" s expand="lg">
        <Navbar.Brand  className="fs-2 fw-bold" as={Link} to="/"><b>BREMOD</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/products">Products</Nav.Link>

            { (user.id !== null ) ? 
                (user.isAdmin === false) ?
                <>
                  <Nav.Link className="nav-link mx-md-3" as={NavLink} to={`/carts/view-cart`}>Cart</Nav.Link>
                  {/* <Nav.Link className="nav-link mx-md-3" as={NavLink} to={`/userprofile`}>Profile</Nav.Link> */}
                  <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/logout">Logout</Nav.Link>
                </>
                :
                <>
                <Nav.Link className="nav-link mx-md-3" as={Link} to="/admin-dashboard" >Admin Dashboard</Nav.Link>
                <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/logout">Logout</Nav.Link>
                </>
              :
              <>
                <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link className="nav-link mx-md-3" as={NavLink} to="/register">Register</Nav.Link>
              </>
            }
            
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

