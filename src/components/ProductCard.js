import { Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { name, description, price, _id } = product;
  const truncatedDescription = description.length > 50 ? description.substring(0, 50) + "..." : description;

  return (
    <Row className="mt-3 mb-3">
      <Col xs={12}>
        <Card className="p-0" id="cardHighlight">
          <Card.Body className="d-flex flex-column"> 
            <Card.Title><h4 class="text-center">{name}</h4></Card.Title>
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text>{truncatedDescription}</Card.Text>
            <Card.Subtitle>Price</Card.Subtitle>
            <Card.Text>{price}</Card.Text>
            <Button id="product-btn" className="bg-primary mt-auto" as={Link} to={`/products/${_id}`}>Details</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
