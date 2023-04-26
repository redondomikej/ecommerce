import NewProduct from '../../components/adminComponents/NewProduct';
import AllProducts from '../../components/adminComponents/AllProducts';
import {Button} from 'react-bootstrap';
import UserContext from '../../UserContext';
import {Navigate, Link} from 'react-router-dom';
import {useContext} from 'react';

export default function AdminDashboard() {

	const {user} = useContext(UserContext);

	return (
		(user.isAdmin !== true) ?
		<Navigate to="/products"/>
		:
		<>
		<h1 className="text-center"><b>Admin Dashboard</b></h1>
		  < NewProduct/>
		  < AllProducts/>
		</>
	)

};


