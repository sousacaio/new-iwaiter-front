import React, { useState } from 'react';
import CatInputs from './CatInputs';
import { getIdBar } from '../../services/auth';
import api from '../../services/api';

const Form = () => {
    const blankCardapio = { bar: getIdBar(), nome: '', valor: '', categoria: '' };
    const [cardapioState, setCardapioState] = useState([{ ...blankCardapio },]);
    const addCardapio = () => {
        setCardapioState([...cardapioState, { ...blankCardapio }]);
    };
    const handleCardapioChange = (e) => {
        const updatedCardapio = [...cardapioState];
        updatedCardapio[e.target.dataset.idx][e.target.className] = e.target.value;
        setCardapioState(updatedCardapio);
    };
    function addProdCardapio() {
        api.post('/cardapio', { ...cardapioState }, { headers: { _id: getIdBar() } }).then()
    }

    var obj = [{ bar: '5de453cd841fb331e8876853', nome: "1", valor: "1", categoria: "1" },
    { bar: '5de453cd841fb331e8876853', nome: "12", valor: "21", categoria: "12" }]
    console.log(cardapioState)
    console.log([
        { bar: '5de453cd841fb331e8876853', nome: "1", valor: "1", categoria: "1" },
        { bar: '5de453cd841fb331e8876853', nome: "12", valor: "21", categoria: "12" },
    ])
    return (
        <form>
            <input
                type="button"
                value="Adicione um novo item ao seu menu"
                onClick={addCardapio}
            />
            {
                cardapioState.map((val, idx) => (
                    <CatInputs
                        key={`cardapio-${idx}`}
                        idx={idx}
                        catState={cardapioState}
                        handleCatChange={handleCardapioChange}
                    />
                ))
            }

            <div onClick={() => addProdCardapio()}>
                Adicionar
            </div>
        </form>
    );
};

export default Form;