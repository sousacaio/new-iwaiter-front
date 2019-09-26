import React, { Component } from 'react';
import './Main.css';
import Navba from '../components/Navbar';
import { Link } from "react-router-dom";
import { getToken } from '../services/auth';
import Emoji from '../components/Emoji';

import { CardGroup, Card, Container, Row, Col, Spinner, Image, Figure } from 'react-bootstrap';

import Sugestao from '../components/Sugestao';
class App extends Component {
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
            var url = new URL('http://localhost/wastelanders/users/feed'), params = { jwt: currentUser }
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
                                {data.map(item => (
                                    <CardGroup key={item.id} className="espacaCartao">
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
                                                                    src={item.avatar}
                                                                />
                                                            </Figure>

                                                        </Col>
                                                        <Col sm={11}>{item.name}</Col>
                                                    </Row>
                                                </Card.Title>
                                                <Image fluid src={item.url} />
         
                                                <Row className="espaca">
                                                    <Col>  <Emoji symbol="👌" label="Ok" count="0" /></Col>
                                                    <Col>  <Emoji symbol="❤️" label="Red Heart" count="0" /></Col>
                                                    <Col>  <Emoji symbol="😲" label="Astonished" count="0" /></Col>
                                                    <Col>  <Emoji symbol="👻" label="Ghost" count="0" /></Col>
                                                    <Col>  <Emoji symbol="🔥" label="Fire" count="0" /></Col>
                                                    <Col>  <Emoji symbol="🤔" label="Thinking face" count={item.like_count} /></Col>

                                                </Row>
                                                <Card.Text>
                                                    {item.name}:blablabalablabal
                                                                                                  </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">{item.comments.map(com =>
                                                    <div key={com.id}>
                                                        <p>{com.id_user}|{com.txt}</p>
                                                        <p>{com.date_comment}</p>
                                                        <p>{com.txt}</p>
                                                    </div>
                                                )}</small>
                                            </Card.Footer>
                                        </Card>
                                        <div></div>
                                    </CardGroup>


                                ))}

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

export default App;









// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import './Main.css';
// import Navbar from '../components/Navbar';
// export default class App extends Component {

//     constructor() {
//         super();
//         this.allBeers = [];
//         this.state = { resposta: [] };
//     }


//     loadFeed() {
//         var valor = window.location.href.split("=");
//         api.get('/users/feed', {
//             params: {
//                 jwt: valor[1]
//             }
//         }).then(function (response) {
//             console.log(response);
//             //this.setState({ resposta: response });
//         })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//             .finally(function () {
//                 // always executed
//             });
//         //this.setState({ resposta: response });
//     }


//     render() {
//         //console.log(this.state.resposta);
//         const Welcome = () => <h1>Hello,Caio!</h1>
//         if (this.state.isLoading) {
//             return (<div className="loader"></div>);
//         }

//         return (

//             <div className="main-container" onLoad={this.loadFeed}>
//                 <Navbar />
//                 <Welcome user="caio" />
//                 <ul>
//                     <li >
//                         <Link to="/">
//                         </Link>
//                         <footer>

//                             <strong>user nome</strong>
//                             <p>user bio</p>
//                         </footer>
//                         <div className="buttons">
//                             <button type="button"
//                             //onClick={() => handleDislike(user._id)}
//                             >
//                             </button>
//                             <button type="button">

//                             </button>
//                         </div>
//                     </li>
//                 </ul>

//             </div >
//         );
//     }
// }
// // export default Class Main extends Component() {


// //     const [dados, setDados] = useState([]);

// //     var valor = window.location.href.split("=");
// //     if (valor[1] === 'undefined') {
// //         window.history.back();
// //     }


// //     async function loadFeed() {
// //         var valor = window.location.href.split("=");
// //         const response = await api.get('/users/feed', {
// //             params: {
// //                 jwt: valor[1]
// //             }
// //         });
// //         setDados(response.data.data);
// //     }

// //     function imprimir(item) {
// //         console.log(item);
// //     }

// //     dados.forEach(imprimir);
// //     const id  = dados.forEach(imprimir);

// //     const Welcome = () => <h1>Hello,Caio!</h1>
// //     return (

// //         <div className="main-container" onLoad={loadFeed}>
// //             <Navbar />
// //             <Welcome user="caio" />
// //         { dados.forEach(imprimir)}
// //             <ul>
// //                 <li >
// //                     <Link to="/">
// //                     </Link>
// //                     <footer>

// //                         <strong>user nome</strong>
// //                         <p>user bio</p>
// //                     </footer>
// //                     <div className="buttons">
// //                         <button type="button"
// //                         //onClick={() => handleDislike(user._id)}
// //                         >
// //                             <img src={dislike} alt="like" />
// //                         </button>
// //                         <button type="button">
// //                             <img src={like} alt="like"
// //                             //onClick={() => handleLike(user._id)}
// //                             />
// //                         </button>
// //                     </div>
// //                 </li>
// //             </ul>

// //         </div >
// //     );
// // }