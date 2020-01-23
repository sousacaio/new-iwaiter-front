import React from 'react';
import './CardCardapio.css';
const CardCardapio = (props) => {
    return (
        <div className="f-card">
            <div className="reference">
                <img className="reference-thumb" alt="img" src="https://img.elo7.com.br/product/zoom/22565B3/adesivo-parede-prato-comida-frango-salada-restaurante-lindo-adesivo-parede.jpg" />
                <div className="reference-content">
                    <div className="social">
                        <div className="social-content">{String(props.descricao).substr(0, 20)}...</div>
                        <div className="social-buttons">
                            <div className="item"><i></i>{props.nome}</div>
                            <div className="item"><i></i>{props.valor}</div>
                            <div className="item"><i></i>{props.categoria}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default CardCardapio;
