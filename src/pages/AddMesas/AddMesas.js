import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import { Container, Coluna } from '../../components/GridArea/GridArea'
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import Card from '../../components/Cards/Card';
const AddMesas = (props) => {

    const [qtdInicial, setQtdInicial] = useState('');
    const blankCardapio = { id_bar: getIdBar(), ocupada: 'nao', numero: '' };
    const [cardapioState, setCardapioState] = useState([{ ...blankCardapio },]);
    const [mesas, setMesas] = useState([]);
    const addCardapio = () => {
        setCardapioState([...cardapioState, { ...blankCardapio }]);
    };

    const handleCardapioChange = (e) => {
        const updatedCardapio = [...cardapioState];
        updatedCardapio[e.target.dataset.idx][e.target.className] = e.target.value;
        setCardapioState(updatedCardapio);
    };
    function checa() {
        api.get('/mesacheck', { headers: { id: getIdBar() } }).then(r => {
            setQtdInicial(r.data)
        });
    }
    function adicionar() {
        cardapioState.map((item) => {
            if (item.numero === '') {
                alert('Há mesas sem número,mas você pode configurá-las mais tarde');
            } else {
                alert('Mesas adicionadas!')
            }
        });
        api.post('/mesa', { quantidade: cardapioState, id_bar: getIdBar() }).then(r => {
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
                <div align="middle">
                    {qtdInicial === 0 ?
                        cardapioState.map((val, idx) => (
                            <div key={idx}>
                                <CatInputs
                                    key={`cardapio-${idx}`}
                                    idx={idx}
                                    catState={cardapioState}
                                    handleCatChange={handleCardapioChange}
                                    adicionar={adicionar}
                                />
                            </div>
                        )) : <AddMais qtd={qtdInicial}
                            mesas={mesas}
                            catState={cardapioState}
                            handleCatChange={handleCardapioChange}
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
                        </div> : ''}
                </div>
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


const CatInputs = ({ idx, catState, handleCatChange }) => {
    const numeroId = `numero-${idx}`;
    return (
        <div key={`cardapio-${idx}`} style={{
            display: 'flex',
            height: '10vh',
            flexDirection: 'row',
            boxShadow: ' 0 0 10px',
            margin: '10px',
            background: '#35302D',
            color: 'white',
            borderRadius: '5px',
            fontWeight: 'bold'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '33%',
            }}>
                <div style={{ margin: 'auto' }}>
                    # {idx + 1}
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{ margin: 'auto' }}>
                        <label htmlFor={numeroId}>{`Número da mesa:`}</label>
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <input
                            style={{ padding: '5px', borderColor: 'white', borderRadius: '5px' }}
                            type="number"
                            name={numeroId}
                            data-idx={idx}
                            id={numeroId}
                            className="numero"
                            value={catState[idx].numero}
                            onChange={handleCatChange}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};



export default AddMesas;
