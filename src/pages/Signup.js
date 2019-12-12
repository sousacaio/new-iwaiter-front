
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../services/api';
export default class Signup extends Component {

    state = {
        nome: "",
        endereco: "",
        email: "",
        password: "",
        phone: ""
    };

    handleSignUp = async e => {
        e.preventDefault()
        const { email, password, endereco, phone, nome } = this.state;
        const res = api.post('/bar', {
            nome, endereco, email, password, phone
        })
        const { token } = res.data;
        console.log(token)
    }
    render() {
        return (
            <div className="mt-4 col-8 offset-2">
                <div className="card">
                    <div className="card-header">Cadastre-se!</div>

                    <div className="card-body">
                        <form onSubmit={this.handleSignUp}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Nome</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="nome" required
                                        onChange={e => this.setState({ nome: e.target.value })} placeholder="Nome" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" name="email" required id="inputEmail3"
                                        onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Senha</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password" required
                                        onChange={e => this.setState({ password: e.target.value })} id="inputPassword3" placeholder="Senha" />
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Confirmação de senha</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password_confirmation" required
                                        id="inputPassword_confirmation3" placeholder="Confirme sua senha" />
                                </div>
                            </div >
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Telefone</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password_confirmation" required
                                        onChange={e => this.setState({ phone: e.target.value })} id="inputPassword_confirmation3" placeholder="Confirme sua senha" />
                                </div>
                            </div >
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Endereco</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password_confirmation" required
                                        onChange={e => this.setState({ endereco: e.target.value })} id="inputPassword_confirmation3" placeholder="Confirme sua senha" />
                                </div>
                            </div >

                            <div className="form-group row">
                                <div className="col-sm-10 offset-2">
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                    <Link to="/" className="btn btn-info float-right">Login</Link>
                                </div>
                            </div >
                        </form >
                    </div >
                </div >
            </div >
        );
    }
}