import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ItemCardapio = (props) => {
    const [data, setData] = useState([])
    const [ownerState, setOwnerState] = useState({
        nome: '',
        valor: '',
        categoria: '',
    });
    const handleOwnerChange = (e) => setOwnerState({
        ...ownerState, [e.target.name]: e.target.value,
    });
    function update() {
        console.log(ownerState)
        api.put('/cardapio', { ...ownerState }, { headers: { id: props.location.state.item } });
        //api.post('/cardapio', { ...cardapioState }, { headers: { _id: getIdBar() } }).then()
    }
    useEffect(() => {
        function fetchData() {
            api.get('/cardapio', { headers: { id: props.location.state.item } }).then((r) => setData(r.data));
        }
        fetchData()
    }, [props, ownerState])
    return (
        <div>
            <label>nome:</label>
            <input
                type="text"
                name="nome"
                className="nome"
                placeholder={data.nome}
                value={ownerState.nome}
                onChange={handleOwnerChange}
            />
            <label>Valor:</label>
            <input
                type="text"
                name="valor"
                className="valor"
                placeholder={data.valor}
                value={ownerState.valor}
                onChange={handleOwnerChange}
            />
            <label>categoria:</label>
            <input
                type="text"
                name="categoria"
                className="categoria"
                placeholder={data.categoria}
                value={ownerState.categoria}
                onChange={handleOwnerChange}
            />
            <div onClick={() => update()}>Alterar</div>
        </div>

    );
}
export default ItemCardapio;