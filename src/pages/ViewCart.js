import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const ViewCart = () => {

  const {user} = useContext(UserContext)
  
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/view/userscart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setCart(data);
      // console.log(data);
      setUserId(data[0].userId);   
      setProducts(data[0].products || []);        
      setTotalAmount(data[0].totalAmount);    
    })
  }, [cart])
  


  const handleClearCart = (e) => {
    // Clear cart and update subtotal and total accordingly
    e.preventDefault();

     fetch(`${process.env.REACT_APP_API_URL}/carts/empty-cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          setCart([]);
          setProducts([]);
          setTotalAmount(0);
          Swal.fire({
            icon: 'success',
            title: 'Cart has been emptied successfully.',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Uhmm...that usually works.'
          })
        }
      });
  };


  return (
    (user.isAdmin === true) ?
    <Navigate to="/"/>
    :
    <>
    
    <Container className="my-4 w-100" style={{ minHeight: '100vh' }}>
      <h1><b>My Cart</b></h1>
      <h6>User ID: {userId}</h6>
      <Table striped bordered hover>
        <thead className="bg-dark">
          <tr className="text-white text-center">
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-light">
          {products.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td className="text-center">{item.price}</td>
              <td className="text-center">
                
                {item.quantity}
                <Button className="mt-2 w-100 h-25 d-block p-0"
                  variant="outline-primary"
                  as={Link}
                  to="/products"
                  size="sm"
                >
                  Change quantity
                </Button>
              </td>
              <td className="text-end">{item.price * item.quantity}</td>
              <td>
                <Button
                  variant="outline-danger"
                  as={Link} to="/products"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-secondary text-white">
          <tr>
            <td colSpan="4">Total:</td>
            <td className="text-end">{totalAmount}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" onClick={(e) => handleClearCart(e)}>
        Clear Cart
      </Button>
      <Button className="mx-3" variant="outline-primary"  as={Link} to="/orders">
        Checkout
      </Button>
    </Container>
    </>
  );
};

export default ViewCart;
