import React, { Component } from 'react';
import api from '../services/api';
import { Link, withRouter } from "react-router-dom";
import { armazenaToken } from '../services/auth';
import './Login.css';


class Login extends Component {
    // const [email, setEmail] = useState('');
    //const [senha, setSenha] = useState('');
    state = {
        email: "",
        senha: "",
        error: "",
        videoURL: "https://www.youtube.com/watch?v=lM02vNMRRB0"
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, senha } = this.state;
        if (!email || !senha) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post('/barauth',
                    { email: email, password: senha }
                );
                const { token } = response.data;
                if (token) {
                    armazenaToken(token);
                    this.props.history.push("/mesas");
                }

            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    render() {
        return (
            //eh preferivel utilizar className ao inves de so class
            //pq class eh uma palavra reservada do js e pode dar erro
            <div>
                <div className="fullscreen-bg">
                    <header>
                        <div className="overlay"></div>
                        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                            <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                        </video>
                        <div className="container h-100">
                            <div className="d-flex h-100  align-items-center">
                                <div className="w-100">
                                    <div className="mt-4 col-8 offset-2">
                                        <div className="card">
                                            <div className="card-header">Faça o login!</div>
                                            <div className="card-body">
                                                <form onSubmit={this.handleSignIn}>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" name="email" required id="inputEmail3"
                                                                onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="password" className="form-control" name="password" required
                                                                id="inputPassword3" placeholder="Password"
                                                                onChange={e => this.setState({ senha: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="col-sm-10 offset-2">
                                                            <button type="submit" className="btn btn-primary" >Entrar</button>
                                                            <Link to="/signup" className="btn btn-info float-right" >Cadastrar</Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div >
                                        </div >
                                    </div >

                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div >


        );
    }
}

export default withRouter(Login);


    //     async function handleSubmit(e) {
    //     e.preventDefault();
    //     const response = await api.post('/users/login',
    //         { email: email, pass: senha }
    //     );
    //     const { jwt } = response.data;
    //     console.log(response.data);
    //     localStorage.setItem('currentUser', jwt);
    //     history.push(`/feed`);

    // }