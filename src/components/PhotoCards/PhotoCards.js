import React from 'react'; 
import { Row, Col, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./PhotoCards.css";
import { useNavigate } from 'react-router-dom';



export default function PhotoCards({data}) {
    const navigate = useNavigate();

    const handleProduct = (path) => {
      navigate(`/${path}`)
    }
return (
    <>
<div className="product-card">
      <Container fluid>
        <Row xs={1} md={2} xxl={3}>
          {data.map(({ name, src, path, txt }) => (
            <Col>
            <Card key={name} className={name} onClick={() => handleProduct(path)}>
              <Card.Img variant="top" className="overlay" src={src} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{txt}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </>
  );
}
