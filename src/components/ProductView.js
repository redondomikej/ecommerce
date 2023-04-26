import { useState, useEffect, useContext } from 'react';

import UserContext from '../UserContext';

import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';

import {useParams, Link} from 'react-router-dom';

import Swal from 'sweetalert2';


export default function ProductView() {

	const {user} = useContext(UserContext);
	const {productId} = useParams();
	console.log(productId);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	
	console.log(quantity);

	

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId])

	function addToCart(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/carts/checkout-single-product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId: user.id,
				productId: productId,
				quantity: quantity
			})	
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data === true) {
				Swal.fire({
				  icon: 'success',
				  title: 'Product has been added to cart!',
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
		})
	};

	function removeFromCart(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/carts/remove-product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId: user.id,
				productId: productId,
				quantity: quantity
			})	
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data === true) {
				Swal.fire({
				  icon: 'success',
				  title: 'Product has been removed',
				  showConfirmButton: false,
				  timer: 1500
				})
			} else {
				Swal.fire({
				  icon: 'warning',
				  title: 'Oops...',
				  text: 'You do not have this product in your cart yet.'
				})
			}
		})
	};

	function updateQuantity(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/carts/amount-to-remove`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId: user.id,
				productId: productId,
				quantity: quantity
			})	
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data === true) {
				Swal.fire({
				  icon: 'success',
				  title: 'Product quantity changed!',
				  showConfirmButton: false,
				  timer: 1500
				})
			} else {
				Swal.fire({
				  icon: 'warning',
				  title: 'Oops...',
				  text: 'You do not have this product in your cart yet. Please add one first.'
				})
			}
		})
	};

	return (

		<Container style={{ minHeight: '100vh' }}>
		  <Row>
			  <Col lg={{span: 6, offset:3}} >
				  <Card>
				      <Card.Body className="text-center">
				        <Card.Title>{name}</Card.Title>
				        <Card.Subtitle>Description:</Card.Subtitle>
				        <Card.Text>{description}</Card.Text>
				        <Card.Subtitle>Price:</Card.Subtitle>
				        <Card.Text>₱ {price}</Card.Text>
						<Card.Subtitle>Quantity:</Card.Subtitle>

						<Container>
						  <Row>
						    <Col className="text-center">
			      				<div className="d-flex flex-column">
			      				<Form onSubmit={(e) => addToCart(e)}>
			      		        <Form.Group className="d-inline-block w-50 justify-content-center" controlId="price">
			      		            <Form.Control 
			      		              type="number" 
			      		              placeholder="Enter quantity"
			      		              value={quantity}
			      		              onChange={e => setQuantity(e.target.value)}
			      		              required
			      		            />
			      		        </Form.Group>
			      		        {
			      	        	  (user.id !== null && user.isAdmin === false) ?
			      	        	  <>
			      	        	  <div className="d-flex justify-content-around">
			              		  <Button className="mt-3" variant="primary" type="submit">Add to Cart</Button>
			              		  <Button className="mx-2 mt-3" variant="danger" onClick={(e) => removeFromCart(e)}>Remove from Cart</Button>
			              		  {/* <Button className="mt-3" variant="warning" onClick={(e) => updateQuantity(e)}>Change quantity</Button> */}
			              		  </div>
			              		  </>
			              		  :
			              		  <Button className="btn btn-danger mt-3" as={Link} to="/login"  >Log in to enjoy Bremod Nourish and Repair Damage Hair</Button>
			      		        }
			      		        </Form>
			      		        </div>
						    </Col>
						  </Row>
						</Container>
						
				      </Card.Body>
				  </Card>
			  </Col>
		  </Row>
		</Container>

	)

};

