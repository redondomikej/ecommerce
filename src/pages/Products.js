import {useState, useEffect} from 'react';

// import {Link} from 'react-router-dom';

// import UserContext from '../UserContext';

import { Row, Col} from 'react-bootstrap';

import ProductCard from '../components/ProductCard';

export default function Products() {

	// const {user} = useContext(UserContext);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/active`)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			const rows = [];
            for (let i = 0; i < data.length; i += 4) {
                const rowItems = data.slice(i, i + 4);
                const row = (
                    <Row key={i} className="mb-2">
                        {rowItems.map((item, j) => (
                            <Col key={j} xs={10} md={3} >

                                <ProductCard key={item._id} product={item} />
                                
                            </Col>
                        ))}
                    </Row>
                );
                rows.push(row);
            }
            setProducts(rows);
		})
	}, [])

	return (
		<>
		<h2 class="text-center"><b>Our Products</b></h2>
	 	{products}
		</>
	)

}



