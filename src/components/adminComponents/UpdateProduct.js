import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';

import UserContext from '../../UserContext';
import {useParams, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {useNavigate, Navigate} from 'react-router-dom';

export default function UpdateProduct() {

	const {user} = useContext(UserContext);
	const navigate = useNavigate();

  const {productId} = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// console.log(data.name);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId])

  useEffect(() => {
		if ( name !== "" && description !== "" && price !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		};
	}, [name, description, price]);

  function NewProductInfo(e) {
  	e.preventDefault();

  	fetch(`${process.env.REACT_APP_API_URL}/products/update/${productId}`, {
  		method: 'PUT',
  		headers: {
  			'Content-Type': 'application/json',
  			Authorization: `Bearer ${localStorage.getItem('token')}`
  		},
  		body: JSON.stringify({
  			name: name,
  			description: description,
  			price: price
  		})
  	})
  	.then(res => res.json())
  	.then(data => {
  		// console.log(data);
  		if (data === true) {
				Swal.fire({
					title: "Product updated!",
					icon: "success",
					text: "This product has been successfully updated in the database!"
				})

				navigate("/admin-dashboard")
			} else {
				Swal.fire({
					title: "Uhmmm...that's awkward.",
					icon: "error",
					text: "There is an error somewhere..."
				})
			}
  	})
  };

	return (
			(user.isAdmin !== true) ?
			<Navigate to="/products"/>
			:
			<>
			<h2>Update product</h2>
			<Form onSubmit={(e) => NewProductInfo(e)}>
			  <Form.Group controlId="productName">
			      <Form.Label>Product Name</Form.Label>
			      <Form.Control 
			        type="text" 
			        placeholder="Enter product name" 
			        value={name}
			        onChange={e => setName(e.target.value)}
			        required
			      />
			  </Form.Group>

			  <Form.Group controlId="description">
			      <Form.Label>Description</Form.Label>
			      <Form.Control 
			        type="textarea" 
			        rows={3}
			        cols={3}
			        placeholder="Enter product description" 
			        value={description}
			        onChange={e => setDescription(e.target.value)}
			        required
			      />
			  </Form.Group>

			  <Form.Group controlId="price">
			      <Form.Label>Price</Form.Label>
			      <Form.Control 
			        type="number" 
			        placeholder="Enter product price"
			        value={price}
			        onChange={e => setPrice(e.target.value)}
			        required
			      />
			  </Form.Group>

			 		{isActive ?
			      <Button variant="primary" type="submit" id="submitBtn">
			        	Save changes
			      </Button>
			       : 
			    	<Button variant="primary" type="submit" id="submitBtn" disabled>
			        	Save changes
			      </Button>
		    	}
		    	<Button variant="danger" id="submitBtn" as={Link} to={"/admin-dashboard"}>
			    		Cancel
			    	</Button>
			</Form>
			</>
	)

  
}

