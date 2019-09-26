import React, { Component } from 'react';
import { CardGroup, Card, Media } from 'react-bootstrap';
import '../pages/Main.css';
export default class Sugestao extends Component {
    render() {
        return (           
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sugestões para você:</Card.Title>
                            <Card.Text>
                                    <Media as="li">
                                        <img
                                            width={100}
                                            height={64}
                                            className="mr-3"
                                            src="https://uploads.metropoles.com/wp-content/uploads/2018/11/16201402/roac-2.jpg"
                                            alt="Generic placeholder"
                                        />
                                        <Media.Body>
                                            Mansão do governador
                                            Residência Oficial de Águas Claras
                                        </Media.Body>
                                    </Media>
                            </Card.Text>
                            <Card.Text>
                                    <Media as="li">
                                        <img
                                            width={100}
                                            height={64}
                                            className="mr-3"
                                            src="https://vignette.wikia.nocookie.net/fallout/images/a/a0/WastelandPicture.jpg/revision/latest?cb=20110309003621"
                                            alt="Generic placeholder"
                                        />
                                        <Media.Body>
                                            Wasteland
                                            Fallout,Wasteland
                                        </Media.Body>
                                    </Media>
                            </Card.Text>
                            <Card.Text>
                                    <Media as="li">
                                        <img
                                            width={100}
                                            height={64}
                                            className="mr-3"
                                            src="http://4.bp.blogspot.com/-Ob3X47xgCKI/UlYS2CuQS0I/AAAAAAAAJeU/VyINrzm5srg/s1600/500+Terrenos.jpg"
                                            alt="Generic placeholder"
                                        />
                                        <Media.Body>
                                            Terreno pra capinar
                                            Incra 08
                                        </Media.Body>
                                    </Media>
                            </Card.Text>
                            <Card.Text>                              
                                    <Media as="li">
                                        <img
                                            width={100}
                                            height={64}
                                            className="mr-3"
                                            src="http://s2.glbimg.com/hkOo_WtDGtK3h89Ts0uaeMgAhLY=/s.glbimg.com/jo/g1/f/original/2015/05/05/terreno_baldio_da_policia_civil.jpg"
                                            alt="Generic placeholder"
                                        />
                                        <Media.Body>
                                           Terreno baldio rua 35 norte
                                            aguas claras,Df
                                        </Media.Body>
                                    </Media>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>

        );
    }
}