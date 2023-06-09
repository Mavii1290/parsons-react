import React from 'react'; 
import { CardGroup, Container, Card } from "react-bootstrap";
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
        <CardGroup>
          {data.map(({ name, src, path }) => (
            <Card key={name} className={name} onClick={() => handleProduct(path)}>
              <Card.Img variant="top" className="overlay" src={src} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Container>
    </div>
    </>
  );
}
