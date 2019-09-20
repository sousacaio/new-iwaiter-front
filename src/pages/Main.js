import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Navbar from '../components/Navbar';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };

    }

    componentDidMount() {
        var valor = window.location.href.split("=");
        var url = new URL('http://localhost/wastelanders/users/feed'),
            params = { jwt: valor[1] }
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

    }
    render() {
        var { isLoaded, items } = this.state;
        var { error, data } = items;
        console.log(data);
        if (!isLoaded) {
            return <div>Loading....</div>
        } else {
            if (error) {
                alert(error);
            }
            return (
                <div className="App">
                    <Navbar/>
                    <ul>
                        {data.map(item => (
                            <li key={item.id}><br/>
                                Id do usuario:{item.id_user} <br/>
                                Url: {item.url} <br/>
                                Avatar: {item.url} <br/>
                                Nome do usuário: {item.name}
                            </li>
                        ))}
                    </ul>
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