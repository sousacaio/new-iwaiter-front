
// // import React, { Component } from 'react';
// // import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
// import { logout } from '../services/auth';
// import { Link } from "react-router-dom";
// import './Navbar.css';
// export default class Navba extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             isLoaded: false
//         };

//     }
//     handleLogout() {
//         logout();
//         localStorage.removeItem('currentIdUser');
//     }

//     render() {
//         const { id_usuario } = this.state.items;
//         localStorage.setItem('currentIdUser', id_usuario);
//         return (
//             <Navbar bg="dark" variant="dark">
//                 <Navbar.Brand href="/mesas">Facilita</Navbar.Brand>
//                 <Nav className="mr-auto">
//                     <Nav.Link href="#home">Sobre nós</Nav.Link>
//                     <Nav.Link href="#features">Nos ajude!</Nav.Link>
//                     <Nav.Link href="#pricing">Nossa meta</Nav.Link>
//                 </Nav>
//                 <Nav className="mr-auto">
//                     <Form inline>
//                         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//                     </Form>
//                 </Nav>
//                 <Nav> <Link className="a" to="/random">Explore!</Link> </Nav>
//                 <Nav> <Link className="a" to="/perfil/">Minha conta</Link></Nav>
//                 <Nav> <Link className="a" to="/" onClick={this.handleLogout}>Logout</Link>

//                 </Nav>
//             </Navbar>

//         );
//     }
// }