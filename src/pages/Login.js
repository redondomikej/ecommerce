import {useState, useEffect, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';

// import {useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

import UserContext from '../UserContext';

import Swal from 'sweetalert2';

export default function Login(){

    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false)

    function authenticate(e){
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if(typeof data.access !== "undefined") {
                
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful!",
                    icon: "success",
                    text: "Let's start shopping!"
                })
            } else {
                Swal.fire({
                    title: "Authentication Failed!",
                    icon: "error",
                    text: "Please check your login details and try again"
                })
            };
    });
        setEmail('')
        setPassword('')      
    };
    const retrieveUserDetails = (token) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                })
            })
        };

    useEffect(() => {
        if((email !== '' && password !== '')){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [email, password])

    return(
        (user.id !== null) ?
        <Navigate to="/products" />
        :
        <div id="loginform">
        <Form className="w-50" onSubmit={e => authenticate(e)} style={{ minHeight: '100vh' }}>
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

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            {   isActive ?
                <Button className="mt-3" variant="primary" type="submit" id="submitBtn">
                    Login
                </Button>
                :
                <Button className="mt-3" variant="warning" type="submit" id="submitBtn" disabled>
                    Login
                </Button>
            }
        </Form>
        </div>
    )
};