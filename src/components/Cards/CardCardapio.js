import React from 'react';
import './CardCardapio.css';
const CardCardapio = (props) => (
    <div>
        <div class="f-card">
            <div class="reference">
                <img class="reference-thumb" src="https://img.elo7.com.br/product/zoom/22565B3/adesivo-parede-prato-comida-frango-salada-restaurante-lindo-adesivo-parede.jpg" />
                <div class="reference-content">

                    <div class="social">
                        <div class="social-content">Descrição pipipopo</div>
                        <div class="social-buttons">
                            <div class="item"><i></i>{props.nome}</div>
                            <div class="item"><i></i>{props.valor}</div>
                            <div class="item"><i></i>{props.categoria}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div >
);


export default CardCardapio;
