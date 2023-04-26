import { Container, Row, Col, Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Home() {
	return (
		<>
    <section className="hero rounded-pill">
      <div className="hero-content">
        <h1 className="hero-title text-dark">Get beautiful shine hair</h1>
        <p className="hero-subtitle"><br/></p>
        <Button id="hero-button" as={Link} to='/products'>Shop Now</Button>
      </div>
    </section>

    <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
              <Card className="cardHighlight p-3">
                  <Card.Body>
                      <Card.Title>
                          <h2 class="text-center">BREMOD Cocoa Butter Nourish & Repair</h2>
                      </Card.Title>
                      <Card.Text>
                          This product is rich in cocoa butter that moisture and prevent hair loss. Cocoa butter is rich in vitamins that moistures hair, has antioxidant and can gently clean tha scalp and hair at the same time. It can prevent loss of pigment, makes the hair fresh, elegant and bright.
                      </Card.Text>
                  </Card.Body>
              </Card>
          </Col>
          <Col xs={12} md={4}>
              <Card className="cardHighlight p-3">
                  <Card.Body>
                      <Card.Title>
                          <h2 class="text-center">BREMOD color Complementary Locking Damaged Hair</h2>
                      </Card.Title>
                      <Card.Text>
                          Contains complement color technical formula that protects. moisturize and can supplement pigment effectively after bleaching ad hair dyeing. It plays the effect of color locking and complement the hair color fora long-lasting bright and vibrant color even after bleaching an dyeing.
                      </Card.Text>
                  </Card.Body>
              </Card>
          </Col>
          <Col xs={12} md={4}>
              <Card className="cardHighlight p-3">
                  <Card.Body>
                      <Card.Title>
                          <h2 class="text-center">BREMOD Straightening/ rebonding Cream</h2>
                      </Card.Title>
                      <Card.Text>
                          Bremod Rebonding contains rich protein factor that nourishes the hair making it soft and smooth, moisturize and protect hair from damaged. It helps in cleansing your scalp and get the healthier hair. 
                      </Card.Text>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
</>
	)
}
