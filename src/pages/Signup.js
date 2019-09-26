
import React, { Component } from 'react';
import { Link } from "react-router-dom";
export default class Signup extends Component {

    render() {
        return (
            <div className="mt-4 col-8 offset-2">
                <div className="card">
                    <div className="card-header">Cadastre-se!</div>

                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Nome</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" required
                                        placeholder="Nome" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" name="email" required id="inputEmail3"
                                        placeholder="Email" />
                                </div>

                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Senha</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password" required 
                                      id="inputPassword3" placeholder="Senha"/>
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