import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    const {title, content, destination, label} = data;

return (
    <Row>
        <Col className="px-5">
            <h1><b>{title}</b></h1>
            <p>{content}</p>
            {/*<Link to={destination}>{label}</Link>*/}
            <Button variant="warning" as={Link} to={destination} >{label}</Button>

        </Col>
    </Row>
    )
}