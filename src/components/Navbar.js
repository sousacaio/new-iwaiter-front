
import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { logout } from '../services/auth';
import api from '../services/api'
import { Link } from "react-router-dom";
import { getToken } from '../services/auth';
import './Navbar.css';

export default class Navba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };

    }
    handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }
    componentDidMount() {

        const currentUser = getToken();
        if (currentUser) {

            api.get('/users/pegaId/', {
                params: {
                    jwt: currentUser
                }
            })
                .then(
                    res => this.setState({
                        isLoaded: true,
                        items: res.data
                    })
                )

                .catch(function (error) {
                    console.log(error);
                })
        } else {
            return <Link to="/"></Link>
        }
    }
    render() {
        const { id_usuario } = this.state.items;
        localStorage.setItem('currentIdUser', id_usuario);
        return (
            // <div class="topnav">
            //     <a class="active" href="#home">Home</a>
            //     <a href="#news">News</a>
            //     <a href="#contact">Contact</a>
            //     <a href="#about">About</a>

            // </div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/feed">Wastelanders</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Sobre nós</Nav.Link>
                    <Nav.Link href="#features">Nos ajude!</Nav.Link>
                    <Nav.Link href="#pricing">Nossa meta</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Nav>
                <Nav> <Link className="a" to="/random">Explore!</Link> </Nav>
                <Nav> <Link className="a" to="/perfil/">Minha conta</Link></Nav>
                <Nav> <Link className="a" to="/" onClick={this.handleLogout}>Logout</Link>

                </Nav>
            </Navbar>

        );
    }
}