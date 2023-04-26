// import React, { useState, useContext, useEffect } from 'react';
// import UserContext from '../UserContext';
// import {Navigate, useNavigate, Link} from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// export default function UserProfile() {
// 	const { user } = useContext(UserContext);
// 	  const navigate = useNavigate();

// 	  const [email, setEmail] = useState('');
// 	  const [newPassword, setNewPassword] = useState('');
// 	  const [confirmPassword, setConfirmPassword] = useState('');
// 	  const [isActive, setIsActive] = useState(false);

// 	  useEffect(() => {
// 	    if (newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword) {
// 	      setIsActive(true);
// 	    } else {
// 	      setIsActive(false);
// 	    }
// 	  }, [newPassword, confirmPassword]);

// 	  useEffect(() => {
// 	    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
// 	      method: 'POST',
// 	      headers: {
// 	        Authorization: `Bearer ${localStorage.getItem('token')}`,
// 	      },
// 	    })
// 	      .then((res) => res.json())
// 	      .then((data) => {
// 	        console.log(data);
// 	        setEmail(data.email);
// 	      });
// 	  }, []);

// 	  const handleChangePassword = (e) => {
// 	    e.preventDefault();
// 	      fetch(`${process.env.REACT_APP_API_URL}/users/change-pass`, {
// 	        method: 'PUT',
// 	        headers: {
// 	          'Content-Type': 'application/json',
// 	          Authorization: `Bearer ${localStorage.getItem('token')}`,
// 	        },
// 	        body: JSON.stringify({
// 	          email: email,
// 	          newPassword: newPassword,
// 	        }),
// 	      })
// 	        .then((res) => res.json())
// 	        .then((data) => {
// 	          console.log(data);
// 	          if (data === true) {
// 	            Swal.fire({
// 	              title: 'Password updated!',
// 	              icon: 'success',
// 	              text: 'Your password has been updated successfully!',
// 	            });
// 	            navigate('/logout');
// 	          } else {
// 	            Swal.fire({
// 	              title: "Uhmmm...that's awkward.",
// 	              icon: 'error',
// 	              text: 'There is an error somewhere...',
// 	            });
// 	          }
// 	        });
// 	  };

//   return (
//   	(user.isAdmin !== false) ?
// 	<Navigate to="/"/>
// 	:
// 	<>
	
//     <div className='container mt-2' style={{ minHeight: '100vh' }}>
//     <Button className="mb-3" size="sm" as={Link} to="/my-order-history">My Order History</Button>
//       <h1 className='mb-3'>Profile</h1>
//       <div className='row'>
//         <div className='col-md-6'>
//           <Form onSubmit={(e) => handleChangePassword(e)}>
//             <Form.Group>
//               <Form.Label>Email:</Form.Label>
//               <Form.Control type='email' value={email} disabled />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>New Password:</Form.Label>
//               <Form.Control
//                 type='password'
//                 value={newPassword}
//                 onChange={(event) => setNewPassword(event.target.value)}
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Confirm Password:</Form.Label>
//               <Form.Control
//                 type='password'
//                 value={confirmPassword}
//                 onChange={(event) => setConfirmPassword(event.target.value)}
//               />
//             </Form.Group>
//             {isActive ?
// 	            <Button className="mt-3" variant='primary' type='submit'>
// 	              Change Password
// 	            </Button>
// 	            :
// 	            <Button className="mt-3" variant='primary' type='submit' disabled>
// 	              Change Password
// 	            </Button>
//             }
//           </Form>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };


