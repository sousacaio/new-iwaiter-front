import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import { Container, Coluna } from '../../components/GridArea/GridArea'
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import Card from '../../components/Cards/Card';
import './AddMesas.css'
const AddMesas = (props) => {
    const [qtdInicial, setQtdInicial] = useState('');
    const mesaObjeto = { id_bar: getIdBar(), ocupada: 'nao', numero: '' };
    /*Aplicando imutabilidade no state*/
    const [mesaState, setMesa] = useState([{ ...mesaObjeto },]);
    const [mesas, setMesas] = useState([]);
    const addCardapio = () => { setMesa([...mesaState, { ...mesaObjeto }]) };

    const handleCardapioChange = (e) => {
        const updatedCardapio = [...mesaState];
        updatedCardapio[e.target.dataset.idx][e.target.className] = e.target.value;
        setMesa(updatedCardapio);
    };
    function checa() {
        api.get('/mesacheck', { headers: { id: getIdBar() } }).then(r => {
            setQtdInicial(r.data)
        });
    }
    function adicionar() {
        mesaState.map((item) => {
            if (item.numero === '') {
                alert('Há mesas sem número,mas você pode configurá-las mais tarde');
            } else {
                alert('Mesas adicionadas!')
            }
        });
        api.post('/mesa', { quantidade: mesaState, id_bar: getIdBar() }).then(r => {
            checa(r);
            setMesas(r.data)
            window.location.reload();
        });

    }

    useEffect(() => {
        function checkCount() {
            api.get('/mesacheck', { headers: { id: getIdBar() } }).then(r => {
                setQtdInicial(r.data);
                r.data > 0 ? api.get('/mesas', { headers: { id: getIdBar() } }).then(r => {
                    setMesas(r.data.mesas);
                }) : setMesas(0)
            });
        }
        checkCount();
    }, []);
    return (
        <Container >
            <Coluna heigth={100} position="fixed" style={{ position: 'fixed' }}>
                <Menu />
            </Coluna>
            <Coluna width={60} heigth={100} style={{ position: 'absolute', left: '20vw' }}>
                <div align="middle"></div>
                {qtdInicial === 0 ?
                    mesaState.map((val, idx) => (
                        <div key={idx}>
                            <NovasMesas
                                key={`cardapio-${idx}`}
                                idx={idx}
                                mesaState={mesaState}
                                handleMesaChange={handleCardapioChange}
                                adicionar={adicionar}
                            />
                        </div>
                    )) : <AddMais qtd={qtdInicial}
                        mesas={mesas}
                        mesaState={mesaState}
                        handleMesaChange={handleCardapioChange}
                        adicionar={adicionar}
                    />}
                {qtdInicial === 0 ?
                    <div>
                        <div align="middle" style={{ margin: '10px' }}>
                            <input
                                type="button"
                                className="brk-btn"
                                value="+"
                                onClick={addCardapio}
                            />
                        </div>
                        <div onClick={() => adicionar()}>
                            [Adicionar]
                    </div>
                    </div> 
                    :
                     ''}
            </Coluna>
        </Container>
    );
};

const AddMais = (props) => {
    const { mesas } = props;
    return (
        <div>
            {mesas.map((i) => {
                return <div key={i.id} >
                    <Card ocupado={i.ocupada} numero={i.numero} id={i.id} />
                </div>
            })}
        </div>
    )
}

const NovasMesas = ({ idx, mesaState, handleMesaChange }) => {
    const numeroId = `numero-${idx}`;
    return (
        <div key={`cardapio-${idx}`} className="mesas-card">
            <div className="mesas-container">
                <div className="margin-auto">
                    # {idx + 1}
                </div>
                <div className="flex-column">
                    <div className="margin-auto">
                        <label htmlFor={numeroId}>{`Número da mesa:`}</label>
                    </div>
                    <div className="margin-auto">
                        <input
                            className="mesas-input" type="number" name={numeroId}
                            data-idx={idx} id={numeroId} className="numero"
                            value={mesaState[idx].numero} onChange={handleMesaChange}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};



export default AddMesas;
