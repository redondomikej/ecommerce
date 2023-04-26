import {Button, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../../UserContext';

import Swal from 'sweetalert2';

import {Navigate, useNavigate} from 'react-router-dom';

export default function NewProduct() {

	const {user} = useContext(UserContext);
	
	const navigate = useNavigate();

	const [productName, setProductName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if ( productName !== "" && description !== "" && price !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		};
	}, [productName, description, price]);

	function createProduct(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/create-product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: productName,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data === true) {
				Swal.fire({
					title: "Product added!",
					icon: "success",
					text: "Successfully added product in the database!"
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

		setProductName("");
		setDescription("");
		setPrice("");
	};


	return (
		(user.isAdmin !== true) ?
		<Navigate to="/products"/>
		:
		<>
		<h3 className="mt-4" class="text-center">Add new products</h3>
		<Form onSubmit={(e) => createProduct(e)}>
		  <Form.Group controlId="productName">
		      <Form.Label>Product Name</Form.Label>
		      <Form.Control 
		        type="text" 
		        placeholder="Product" 
		        value={productName}
		        onChange={e => setProductName(e.target.value)}
		        required
		      />
		  </Form.Group>

		  <Form.Group controlId="description">
		      <Form.Label>Description</Form.Label>
		      <Form.Control 
		        type="text" 
		        placeholder="Description" 
		        value={description}
		        onChange={e => setDescription(e.target.value)}
		        required
		      />
		  </Form.Group>

		  <Form.Group controlId="price">
		      <Form.Label>Price</Form.Label>
		      <Form.Control 
		        type="number" 
		        placeholder="Price"
		        value={price}
		        onChange={e => setPrice(e.target.value)}
		        required
		      />
		  </Form.Group>

		 	{isActive ?
		        <Button className="mt-2 mb-5" variant="primary" type="submit" id="submitBtn">
		        	Submit
		        </Button>
		        	:
		    	<Button className="mt-2 mb-5" variant="danger" type="submit" id="submitBtn" disabled>
		    		Submit
		    	</Button>
	    	}
		</Form>
		</>
	);
}



