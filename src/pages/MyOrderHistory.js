// import {useContext, useState, useEffect} from 'react';
// import UserContext from '../UserContext';
// import {Navigate} from 'react-router-dom';
// import { Accordion, Card } from "react-bootstrap";

// export default function MyOrderHistory() {
// 	const {user} = useContext(UserContext);

// 	const [orders, setOrders] = useState([]);

// 	useEffect(() => {
// 	    fetch(`${process.env.REACT_APP_API_URL}/orders/view/usersorder`, {
// 	      headers: {
// 	        Authorization: `Bearer ${localStorage.getItem('token')}`
// 	      }
// 	    })
// 	    .then(res => res.json())
// 	    .then(data => {
// 	      setOrders(data);
// 	      console.log(data);  
// 	    })
// 	}, [])

// 	return (
// 		(user.isAdmin !== false) ?
// 			<Navigate to="/"/>
// 			:
// 			<>
// 				<h1><b>My Order History*</b></h1>
// 				<Accordion style={{ minHeight: '100vh' }}>
// 					{orders.map((order, index) => (
// 						<Accordion.Item eventKey={index} key={order._id}>
// 							<Accordion.Header>Order ID: {order._id}</Accordion.Header>
// 							<Accordion.Body>
// 								<p>User ID: {order.userId}</p>
// 								<p>Cart ID: {order.cartId}</p>
// 								<p>Total Amount: {order.totalAmount}</p>
// 								<Card>
// 									<Card.Header className="bg-dark text-white">Products</Card.Header>
// 									<Card.Body>
// 										{order.products.map((product, i) => (
// 											<div key={product._id}>
// 												<p>Product ID: {product.productId}</p>
// 												<p>Name: {product.name}</p>
// 												<p>Description: {product.description}</p>
// 												<p>Price: {product.price}</p>
// 												<p>Quantity: {product.quantity}</p>
// 												<p>Subtotal: {product.subTotal}</p>
// 												<hr />
// 											</div>
// 										))}
// 									</Card.Body>
// 								</Card>
// 							</Accordion.Body>
// 						</Accordion.Item>
// 					))}
// 				</Accordion>
// 			</>
// 	)
// };
