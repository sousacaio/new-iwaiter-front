import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import { Cont, Flexcolumn, Flexrow, Button, Input } from '../../components/GridArea/GridArea'
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import CountUp from 'react-countup'
import CheckBox from '../../components/Checkbox/Checkbox';
import './AddMesas.css'
const AddMesas = (props) => {
    const [qtdInicial, setQtdInicial] = useState('');
    const [numero, setNumero] = useState(0);
    const mesaObjeto = { id_bar: getIdBar(), ocupada: 'nao', numero: '' };
    /*Aplicando imutabilidade no state*/
    const [mesaState, setMesa] = useState([{ ...mesaObjeto },]);
    const [mesas, setMesas] = useState([]);
    const addCardapio = () => { setMesa([...mesaState, { ...mesaObjeto }]) };

    const addPorNumero = (numero) => {
        var arr = [];
        var len = numero;
        for (var i = 0; i < len; i++) {
            arr.push({
                numero: i + 1,
                id_bar: getIdBar(),
                ocupada: 'nao'
            });
        }
        return arr;
    }

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
        const resultado = addPorNumero(numero);
        api.post('/mesa', { quantidade: resultado, id_bar: getIdBar() }).then(r => {
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
        <Cont style={{ overflowX: 'hidden' }}>
            <Flexrow size={10}>
                <Flexcolumn size={2}>
                    <Menu />
                </Flexcolumn>
                <Flexcolumn size={8}>
                    {qtdInicial === 0 ?
                        <> No momento vc n tem nenhuma mesa,escolha a quantidade de mesas:
                        <input
                                className="mesas-input" type="number"
                                className="numero"
                                value={numero} onChange={e => setNumero(e.target.value)}
                            />
                            <input
                                type="button"
                                className="brk-btn"
                                value="Adicionar"
                                onClick={adicionar}
                            />
                        </>
                        : <AddMais qtd={qtdInicial}
                            mesas={mesas}
                            mesaState={mesaState}
                            handleMesaChange={handleCardapioChange}
                            adicionar={adicionar}

                        />}
                </Flexcolumn>
            </Flexrow>
        </Cont>
    );
};

const AddMais = (props) => {
    const { mesas } = props;
    const [novasMesas, setNovasMesas] = useState('');

    const handleCheck = (event) => {
        const id = event.target.value;
        //console.log(id)
        api.delete('/mesa', { data: { id } }).then(
            (r) => {
                console.log(r)
                window.location.reload()
            }

        );
    }
    const addPorNumero = (numero, iniciaEm) => {
        var title = [];
        if (parseInt(numero) > parseInt(iniciaEm)) {
            for (var i = parseInt(iniciaEm) - 1; i < parseInt(numero); i++) {
                title.push({
                    numero: (i + 1),
                    id_bar: getIdBar(),
                    ocupada: 'nao'
                });
            }
        } else {
            let soma = (parseInt(iniciaEm) + parseInt(numero));
            for (var i = parseInt(iniciaEm) - 1; i < soma; i++) {
                title.push({
                    numero: (i + 1),
                    id_bar: getIdBar(),
                    ocupada: 'nao'
                });
            }
        }
        let filtered = title.filter(function (el) { return el != null });
        let arrayLimpo = filtered.slice(1)
        api.post('/mesa', { quantidade: arrayLimpo, id_bar: getIdBar() }).then(r => {
            console.log(r)
            window.location.reload()
        });
    }
    const removeMesas = () => {

    }
    const addNovaMesa = () => {
        const temNumero = mesas[mesas.length - 1]
        addPorNumero(novasMesas, temNumero?.numero);
    }
    useEffect(() => {
    }, [novasMesas, mesas])
    return (
        <>
            <Flexrow size={10}>
                <div className="container">
                    <div className="container-header">
                        <div className="container-header-cont">
                            <div className="container-header-numero">
                                <CountUp
                                    end={mesas.length}
                                    duration={2}
                                /> mesas
                            </div>
                        </div>
                    </div>
                    <div className="container-add-e-remove">
                        <div className="container-add">
                            <div className="container-texto">
                                Adicionar mesas
                            </div>
                            <Input borda="#35302D" type="number" value={novasMesas} onChange={e => setNovasMesas(e.target.value)} />
                            <br />
                            <Button onClick={addNovaMesa} primary="#35302D">
                                Adicionar
                        </Button>
                        </div>
                        <div className="container-remove">
                            <div className="container-texto">
                                <div className="container-texto">
                                    Remover mesas
                            </div>
                                {mesas.map((mesa) => (
                                    <div>
                                        <Input type="checkbox" value={mesa.id}
                                            className="deletaMesa"
                                            onChange={e => handleCheck(e)}
                                        />{mesa.numero}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Flexrow>
            {/* <Flexrow size={1.5} style={{ overflowY: 'hidden' }}>
                <div className="mesas-card-quantidade">
                    <div className="mesas-card-quantidade-numero">
                        Mesas:
                <CountUp
                            end={mesas.length}
                            duration={2}
                        />
                    </div>
                </div>
            </Flexrow>
            <Flexrow size={3} style={{ marginTop: '2vh' }}>
                <Flexcolumn size={5}>
                    <div className="mesas-card-quantidade">
                        Adicionar novas mesas:<br />
 
                    </div>
                </Flexcolumn>
                <Flexcolumn size={5}>
                    <div className="mesas-card-quantidade">
                        remover mesas existentes:<br />

                    </div>
                </Flexcolumn>
            </Flexrow> */}
        </>
    )
}

export default AddMesas;
