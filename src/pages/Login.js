import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/users/login',
            { email: email, pass: senha }
        );
        const { jwt } = response.data;
        console.log(response.data);

        history.push(`/feed/jwt=${jwt}`);
    }
    return (
        //eh preferivel utilizar className ao inves de so class
        //pq class eh uma palavra reservada do js e pode dar erro
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit">
                    Enviar
                </button>
            </form>

        </div>
    );
}

