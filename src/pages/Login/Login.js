
import React, { useState } from 'react';
import api from '../../services/api';
import { armazenaIdBar, armazenaToken } from '../../services/auth';
import { useAlert } from 'react-alert'
import './login.scss';
//https://codepen.io/frontendmax/pen/RazXVb

const Login = (props) => {
    const alert = useAlert()
    const [signin, setSignIn] = useState({ email: '', password: '' });
    const [signup, setSignUp] = useState({ email: '', password: '', pass2: '' });
    const [error, setError] = useState('')
    const handleLoginChange = (e) => setSignIn({
        ...signin, [e.target.name]: e.target.value,
    });
    const handleSignUpChange = (e) => setSignUp({
        ...signup, [e.target.name]: e.target.value,
    });

    async function handleSignUp(e) {
        e.preventDefault()
        const { email, password, pass2 } = signup;
        if (password === pass2) {
            await api.post('/bar', {
                email, password,
            }).then((r) => {
                loginBySignup(r.data.bar.email, r.data.bar.password);
            })

        } else {
            alert.show('A senhas devem ser iguais!')
        }
    }
    async function loginBySignup(email, password) {
        try {
            await api.post('/barauth',
                { email: email, password: password }
            ).then((response) => {
                const { token } = response.data;
                if (token) {
                    armazenaToken(token);
                    armazenaIdBar(response.data.bar.id)
                    props.history.push("/mesas");
                }
            });
        } catch (err) {
            alert.show("Houve um problema com o login, verifique suas credenciais. T.T");
        }
    }
    async function handleSignIn(e) {
        e.preventDefault();
        const { email, password } = signin;
        if (!email || !password) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
            try {
                const response = await api.post('/barauth',
                    { email: email, password: password }
                );
                const { token } = response.data;
                if (token) {
                    armazenaToken(token);
                    armazenaIdBar(response.data.bar.id)
                    props.history.push("/mesas");
                }
            } catch (err) {
                alert.show("Houve um problema com o login, verifique suas credenciais. T.T");
            }
        }
    };
    function trocaForm() {
        const switchers = [...document.querySelectorAll('.switcher')]
        switchers.forEach(item => {
            item.addEventListener('click', function () {
                switchers.forEach(item => item.parentElement.classList.remove('is-active'))
                this.parentElement.classList.add('is-active')
            })
        })
    }
    console.log(signup)
    const Background =' https://images.unsplash.com/photo-1512805147242-c3e79caf64bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';
    return (
        <div style={{
            backgroundImage: `url(${Background})`,
        }}>
            {error !== '' ? alert.info(error) : ''}
            <section className="forms-section">
                <h1 style={{ color: '#3b4465' }} className="section-title">iWaiter</h1>
                <div className="forms">
                    <div className="form-wrapper is-active">
                        <button type="button" className="switcher switcher-login" onClick={() => trocaForm()}>
                            Login
        <span className="underline"></span>
                        </button>
                        <form onSubmit={handleSignIn} className="form form-login">
                            <fieldset>
                                <legend></legend>
                                <div className="input-block">
                                    <label htmlFor="login-email">E-mail</label>
                                    <input
                                        value={signin.email}
                                        name="email"
                                        onChange={handleLoginChange}
                                        id="login-email"
                                        type="email"
                                        required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="login-password">Senha</label>
                                    <input
                                        value={signin.password}
                                        onChange={handleLoginChange}
                                        id="login-password"
                                        type="password"
                                        name="password"
                                        required />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-login">Login</button>
                        </form>
                    </div>
                    <div className="form-wrapper">
                        <button type="button" className="switcher switcher-signup" onClick={() => trocaForm()}>
                            Ainda não é cadastrado?!
        <span className="underline"></span>
                        </button>
                        <form className="form form-signup" onSubmit={handleSignUp}>
                            <fieldset>
                                <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                                <div className="input-block">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input
                                        value={signup.email}
                                        onChange={handleSignUpChange}
                                        id="email"
                                        name="email"
                                        type="email" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password">Senha</label>
                                    <input
                                        value={signup.password}
                                        onChange={handleSignUpChange}
                                        name="password"
                                        id="password"
                                        type="password" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password-confirm">Confirme sua senha</label>
                                    <input
                                        value={signup.pass2}
                                        onChange={handleSignUpChange}
                                        name="pass2"
                                        id="signup-password-confirm" type="password" required />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-signup">Continue</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Login;
