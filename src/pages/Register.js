import {Button, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';

import Swal from 'sweetalert2';

import {Navigate, useNavigate} from 'react-router-dom';

export default function Register() {

	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [isActive, setIsActive] = useState(false);

  useEffect(() => {
		if (( email !== "" && password1 !== "" && password2 !== "") && password1 === password2) {
			setIsActive(true);
		} else {
			setIsActive(false);
		};
	}, [email, password1, password2]);

  function registerUser(e) {
  	e.preventDefault();

  	
  	// checking if email exists
  	fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			email: email
  		})
  	})
  	.then(res => res.json())
  	.then(data => {
  		console.log(data);

  		if (data !== true) {
  			// registering the user to mongoDB
  			fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
  				method: 'POST',
  				headers: {
  					'Content-Type': 'application/json'
  				},
  				body: JSON.stringify({
  					email: email,
  					password: password1
  				})
  			})
  			.then(res => res.json())
  			.then(data => {
  				console.log(data);

  				if (data === true) {
  					Swal.fire({
  						title: "Registration successful",
  						icon: "success",
  						text: "Welcome to Zuitt!"
  					})

  					navigate("/login")
  				} else {
  					Swal.fire({
  						title: "Duplicate email found",
  						icon: "error",
  						text: "Please provide a different email."
  					})
  				}
  			})

  			navigate("/login")
  		} else {
  			Swal.fire({
  				title: "Duplicate email found",
  				icon: "error",
  				text: "Please provide a different email."
  			})
  		}
  	})
  	// s55 activity end

  	// Clear input fields
  	setEmail("");
  	setPassword1("");
  	setPassword2("");
  };

  return (
  	(user.id !== null)?
  	<Navigate to="/login"/>
  	:
    <div id="regform">
    <Form className="w-50" onSubmit={(e) => registerUser(e)} style={{ minHeight: '100vh' }}>
      <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
      </Form.Group>

      <Form.Group controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password1}
            onChange={e => setPassword1(e.target.value)}
            required
          />
      </Form.Group>

      <Form.Group controlId="password2">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Verify Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
      </Form.Group>

      {isActive ?
            <Button className="mt-3" variant="primary" type="submit" id="submitBtn">
            	Submit
            </Button>
            	:
        	<Button className="mt-3" variant="warning" type="submit" id="submitBtn" disabled>
        		Submit
        	</Button>
        	}
    </Form>
    </div>
  );
}