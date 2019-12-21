import React from 'react';
import './Card.css';
import { Container, Row, Column } from '../../components/areaComponents';
const Card = (props) => (
    <Container tamanho="600px" >
        <Row>
            <Column>
                <div className="card" style={{ backgroundColor: '#35302D', color: "white" }}>Mesa:{props.numero}<br />Ocupada:{props.ocupado}<br />Id:{props.id}</div>
            </Column>
        </Row>
    </Container>
);


export default Card;
