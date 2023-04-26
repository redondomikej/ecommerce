import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Checkout() {
  const navigate = useNavigate();

  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isActive, setIsActive] = useState(false);

  // const [userId, setUserId] = useState("");
  const [cartId, setCartId] = useState("");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

   useEffect(() => {
        if((billingAddress !== '' && shippingAddress !== '')){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [billingAddress, shippingAddress])

  const fetchCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/view/userscart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // setUserId(data[0].userId);
        setCartId(data[0]._id);
        setProducts(data[0].products || []);
        setTotalAmount(data[0].totalAmount);
      })
      .catch(error => console.error('Error fetching cart', error));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        cartId: cartId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data === true) {
          Swal.fire({
            title: 'Order has been placed!',
            text: 'Thank you for shopping!',
          })
          setTotalAmount(0);
          setProducts([]);

          navigate("/")
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Try Again.'
          })
        }
      })
      .catch(error => console.error('Error placing order', error));
  };

  return (
  <Container className="my-4" style={{ minHeight: '100vh' }}>
    <h1 class="text-center"><b>Checkout</b></h1>
    <hr />
    <h3 class="text-center">Order Summary</h3>
    <table className="table border-dark">
      <thead className="bg-dark">
        <tr className="text-white">
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className="bg-light border-dark">
        {products.map((item) => (
          <tr key={item.productId}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity}</td>
          </tr>
        ))}
      </tbody>
      <tfoot className="bg-secondary">
        <tr className="text-white">
          <td colSpan="2">Total:</td>
          <td>{totalAmount}</td>
        </tr>
      </tfoot>
    </table>
      <Button variant="primary" onClick={handlePlaceOrder}>
        Place Order Now
      </Button>  
    
    <Button variant="outline-primary" className="mx-3" as={Link} to="/carts/view-cart">
      Go Back to Cart
    </Button>
  </Container>
);
};


