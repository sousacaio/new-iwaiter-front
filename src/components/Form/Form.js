import React, { useState } from 'react';
import CatInputs from './Inputs';
import { getIdBar } from '../../services/auth';
import api from '../../services/api';
import { useAlert } from 'react-alert'
import './button.scss';
//https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f
const Form = () => {
    const alert = useAlert();
    const blankCardapio = { id_bar: getIdBar(), nome: '', valor: '', categoria: '' };
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
        api.post('/cardapio', { cardapioState }, { headers: { _id: getIdBar() } }).then((r) => {
            alert.show(r.data.message)
        })
    }
    return (
        <form>
            {
                cardapioState.map((val, idx) => (
                    <div>
                        <CatInputs
                            key={`cardapio-${idx}`}
                            idx={idx}
                            catState={cardapioState}
                            handleCatChange={handleCardapioChange}
                        />
                    </div>
                ))
            }
            <div align="middle" style={{margin:'10px'}}>
                <input
                    type="button"
                    className="brk-btn"
                    value="+"
                    onClick={addCardapio}
                />
            </div>
            <div align="middle" style={{margin:'10px'}}>
                <div onClick={() => addProdCardapio()} className="brk-btn">
                    Adicionar
                </div>
            </div>


        </form>
    );
};

export default Form;