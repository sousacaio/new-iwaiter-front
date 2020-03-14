import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//pega o nosso componente App e coloca ele dentro da div root
const Root = () => (
        <App />
)
ReactDOM.render(<Root />, document.getElementById('root'));


