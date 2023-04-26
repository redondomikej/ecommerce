import { Button, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AllProductCard({ product }) {
  const { name, description, price, isActive, _id } = product;
  const [clickable, setClickable] = useState(isActive);
  console.log(_id);
  const navigate = useNavigate();

  function reactivateProduct(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/reactivate/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          setClickable(true);
          Swal.fire({
            title: 'Activated',
            icon: 'success',
            text: 'This product has been successfully reactivated.',
          });

          navigate('/admin-dashboard');
        } else {
          Swal.fire({
            title: "Uhmmm...that's awkward.",
            icon: 'error',
            text: 'Please contact the senior developer immediately.',
          });
        }
      });
  }

  function archiveProduct(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/archive/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          setClickable(false);
          Swal.fire({
            title: 'Archived',
            icon: 'success',
            text: 'This product has been successfully archived.',
          });

          navigate('/admin-dashboard');
        } else {
          Swal.fire({
            title: "Uhmmm...that's awkward.",
            icon: 'error',
            text: 'Please contact the senior developer immediately.',
          });
        }
      });
  }

  return (
    <Row className="mt-3 mb-3">
      <Col xs={12}>
        <Card className="cardHighlight p-0">
          <Card.Body>
            <Card.Title>
              <h4>{name}</h4>
            </Card.Title>
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Subtitle>Price</Card.Subtitle>
            <Card.Text>{price}</Card.Text>

            <Button className="bg-primary" as={Link} to={`/products/update/${_id}`}>Update</Button>

            {clickable ? (
            <>
              <Button className="bg-danger mx-2" onClick={archiveProduct}>
                Archive
              </Button>
              <Button className="bg-warning" variant="warning" disabled>
                Activate
              </Button>
            </>
            ) : (
            <>
              <Button className="bg-danger mx-2" disabled>
                Archive
              </Button>
              <Button className="bg-warning" variant="warning" onClick={reactivateProduct}>
                Activate
              </Button>
            </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

