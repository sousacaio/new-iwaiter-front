import React from 'react';
import './CardCardapio.css';
import camera from '../../assets/logo.svg'
const CardCardapio = (props) => {
    return (
        <div className="f-card">
            <div className="reference">
                {props.foto ?
                    <img className="reference-thumb" alt={props.foto} src={`http://localhost:3000/files/${props.foto}`} />
                    :
                    <img className="reference-thumb" alt="img" src={camera} />
                }
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
