import React, { useState, useEffect } from 'react';
import './Main.css';
import { getIdBar } from '../services/auth';
import api from '../services/api';
import Menu from '../components/Menu/Menu';
import Card from '../components/Cards/Card';
import { Container, Column } from '../components/areaComponents';
const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getMesas() {
            api.get('/mesas', { headers: { id: getIdBar() } })
                .then((r) => {
                    console.log(r.data);
                    setData(r.data.mesas);
                })
        }
        getMesas();
    }, []);
    return (

        <Container>
            <Column>
                <Menu />
            </Column>
            <Column>
                {data.map((i) => {
                    return <div key={i._id} >
                        <Card ocupado={i.ocupada} numero={i.numero} id={i._id} />
                    </div>
                })}
            </Column>
        </Container>
    );
}

export default App;











// import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
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