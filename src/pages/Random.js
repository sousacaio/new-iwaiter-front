import React, { Component } from 'react';
import './Main.css';
import Navba from '../components/Navbar';
import { Link } from "react-router-dom";
import { getToken } from '../services/auth';
import { CardGroup, Card, Container, Row, Col, Spinner, Image, Figure } from 'react-bootstrap';

import Sugestao from '../components/Sugestao';

class Random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };

    }

    componentDidMount() {

        const currentUser = getToken();
        if (currentUser) {

            var url = new URL('http://localhost/wastelanders/photos/random'), params = { jwt: currentUser }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        items: json
                    })
                })
                .catch(err => console.log(err));
        } else {
            return <Link to="/"></Link>
        }


    }

    render() {
        var { isLoaded, items } = this.state;
        var { error, data } = items;
        console.log(data);
        if (!isLoaded) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        } else {
            if (error) {

            }
            return (
                <div>
                    <Navba />
                    <Container>
                        <Row>
                            <Col xs={9}>
                                <CardGroup >
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col sm={1}>
                                                        <Figure>
                                                            <Figure.Image
                                                                width={32}
                                                                height={32}
                                                                alt="171x180"
                                                                src="http://localhost/wastelanders/media/photos/keanu.jpg"
                                                            />
                                                        </Figure>

                                                    </Col>
                                                    <Col sm={11}>Programador cansado</Col>
                                                </Row>
                                            </Card.Title>
                                            <Image fluid src="http://localhost/wastelanders/media/photos/keanu.jpg" />
                                            <Card.Text>
                                                <div>
                                                Programador cansado: Ah cara plmdds da um crédito aí vai
                                                    </div>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">
                                                <div>
                                                    Sem comentários 
                                                </div>
                                            </small>
                                        </Card.Footer>
                                    </Card>
                                    <div></div>
                                </CardGroup>

                            </Col>
                            <Col xs={2}>
                                <div className="fixado">
                                    <Sugestao />
                                </div>

                            </Col>
                        </Row>
                    </Container>

                </div>
            );
        }

    }


}

export default Random;
