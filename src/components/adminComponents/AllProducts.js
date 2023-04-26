import {useState, useEffect} from 'react';

// import {Link} from 'react-router-dom';

import AllProductCard from './AllProductCard';


export default function AllProducts() {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/all/inventory`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProducts(data.map(product => {
				return(
					<AllProductCard key={product._id} product={product} />
				)
			}))
		})
	}, [setProducts])


	return (
		<>
		  <h3 className="text-center">Products</h3>
		  {products}
		</>
	)


};


