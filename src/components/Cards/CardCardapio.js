import React from 'react';
import './CardCardapio.css';
import Camera from '../../assets/Cam.png'
const CardCardapio = (props) => {
    return (
        <div className="f-card">
            <div className="reference">
                {props.foto ?
                    <img className="reference-thumb" alt={props.foto} src={`http://localhost:3000/files/${props.foto}`} />
                    :
                    <img className="reference-thumb" alt="img" src={Camera} />
                }
                <br />
                <div>
                    <div className="item"><i></i>{props.nome}</div>
                    <div className="item"><i></i>{props.valor}</div>
                    <div className="item"><i></i>{props.categoria}</div>
                </div>
            </div>
        </div>

    );
}


export default CardCardapio;
