import React from 'react';
import './CardCardapio.css';
const CardCardapio = (props) => (
    <div>
        <div className="row">
            <div className="column">
                <div className="card">{props.nome}<br />valor:{props.valor}<br />Categoria:{props.categoria}</div>
            </div>
        </div>
    </div>
);


export default CardCardapio;
