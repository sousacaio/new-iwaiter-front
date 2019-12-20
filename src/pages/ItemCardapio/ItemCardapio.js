import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { getIdBar } from '../../services/auth';


export default function ItemCardapio(props, history) {
    const [thumbnail, setThumbnail] = useState(null);
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nome, setNome] = useState('');
    const [id, setId] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('valor', valor);
        data.append('categoria', categoria);
        data.append('nome', nome);
        data.append('bar', getIdBar())
        api.put('/cardapio', { data }, { headers: { id: props.location.state.item } });

    }
    useEffect(() => {
        function fetchData() {
            api.get('/cardapio', { headers: { id: props.location.state.item } }).then((r) => {
                setId(r.data._id);
                setNome(r.data.nome);
                setValor(r.data.valor)
                setCategoria(r.data.categoria);
            });
        }
        fetchData()
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
            </label>

            <label htmlFor="nome">Nome</label>
            <input
                id="nome"
                value={nome}
                onChange={event => setNome(event.target.value)}
            />

            <label htmlFor="valor">Valor</label>
            <input
                id="valor"
                value={valor}
                onChange={event => setValor(event.target.value)}
            />

            <label htmlFor="categoria">Categoria</label>
            <input
                id="categoria"
                value={categoria}
                onChange={event => setCategoria(event.target.value)}
            />
            <button type="submit" className="btn">Alterar</button>
        </form>
    )
}

// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';

// const ItemCardapio = (props) => {
//     const [data, setData] = useState([])
//     const [ownerState, setOwnerState] = useState({
//         nome: '', valor: '', categoria: '',
//     });
//     const handleOwnerChange = (e) => setOwnerState({
//         ...ownerState, [e.target.name]: e.target.value,
//     });
//     function update() {
//         console.log(ownerState)
//         api.put('/cardapio', { ...ownerState }, { headers: { id: props.location.state.item } });
//         //api.post('/cardapio', { ...cardapioState }, { headers: { _id: getIdBar() } }).then()
//     }
//     useEffect(() => {
//         function fetchData() {
//             api.get('/cardapio', { headers: { id: props.location.state.item } }).then((r) => setData(r.data));
//         }
//         fetchData()
//     }, [props, ownerState])
//     return (
//         <div>
//             <label>nome:</label>
//             <input
//                 type="text"
//                 name="nome"
//                 className="nome"
//                 placeholder={data.nome}
//                 value={ownerState.nome}
//                 onChange={handleOwnerChange}
//             />
//             <label>Valor:</label>
//             <input
//                 type="text"
//                 name="valor"
//                 className="valor"
//                 placeholder={data.valor}
//                 value={ownerState.valor}
//                 onChange={handleOwnerChange}
//             />
//             <label>categoria:</label>
//             <input
//                 type="text"
//                 name="categoria"
//                 className="categoria"
//                 placeholder={data.categoria}
//                 value={ownerState.categoria}
//                 onChange={handleOwnerChange}
//             />
//             <div onClick={() => update()}>Alterar</div>
//         </div>

//     );
// }
// export default ItemCardapio;