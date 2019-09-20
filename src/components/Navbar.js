import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse">
                <div className="container-fluid navbar-header">
                    <Link className="navbar-brand" to='/'>Sair</Link>
                </div>
                <div className="navbar-form form-group" role="search">
                    <input
                        className="navbar-right form-control"
                        name="search"
                        type="text"
                        placeholder="..."
                    />
                </div>
            </div>
        );
    }
}