import React, { Component } from 'react';

import api from '../services/api'
import { Link } from "react-router-dom";
import { getToken } from '../services/auth';
import Navba from '../components/Navbar'
import '../pages/Perfil.css';
export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            id: '',
            nome: '',
            avatar: '',
            email: ''

        };

    }
    componentDidMount() {
        this.getUser();
    }
    async getUser() {
        const currentUser = getToken();
        
        const id_usuario_logado = localStorage.getItem("currentIdUser");
        console.log(id_usuario_logado);

        console.log(localStorage.getItem("currentIdUser"));
        if (currentUser) {
            await api.get('users/3' + id_usuario_logado, {
                params: {
                    jwt: currentUser
                }
            })
                .then(
                    //res => console.log(res.data)
                    res => this.setState({
                        isLoaded: true,
                        items: res.data,
                        id: res.data.data.id,
                        nome: res.data.data.name,
                        avatar: res.data.data.avatar,
                        email: res.data.data.email


                    })
                ).catch(function (error) {
                    console.log(error);
                })
        } else {
            return <Link to="/"></Link>
        }
    }
    render() {
        return (
            <div>
                <Navba />
                <div className="card">
                     <div className="card-body">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Perfil</h4>
                                        <div className="container">
                                            <img className="img-fluid" alt="Foto de perfil" src={this.state.avatar} />
                                        </div>
                                        <div class="container">
                                            <div className="row">{this.state.nome}</div>
                                            <div className="row">{this.state.email}</div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="col-sm-10">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="jumbotron">
                                            <div className="social-box">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-xs-12 text-center">
                                                            <div className="box">
                                                                <i className="fa fa-behance fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Contribuições:</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span>0</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-xs-12  text-center">
                                                            <div className="box">
                                                                <i className="fa fa-twitter fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Fotos:</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span>0</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-xs-12 text-center">
                                                            <div className="box">
                                                                <i className="fa fa-facebook fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Seguindo</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-xs-12 text-center">
                                                            <div className="box">
                                                                <i className="fa fa-pinterest-p fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Seguidores</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span>0</span>
                                                                </div>
                        
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-xs-12 text-center">
                                                            <div className="box">
                                                                <i className="fa fa-google-plus fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Badges</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span>0</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-xs-12 text-center">
                                                            <div className="box">
                                                                <i className="fa fa-github fa-3x" aria-hidden="true"></i>
                                                                <div className="box-title">
                                                                    <h3>Visualizações</h3>
                                                                </div>
                                                                <div className="box-text">
                                                                    <span> 0</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}