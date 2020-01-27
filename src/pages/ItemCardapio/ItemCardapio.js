import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Coluna } from '../../components/GridArea/GridArea'
import Menu from '../../components/Menu/Menu';
import { useAlert } from 'react-alert'
import './styles.css'
import { camera } from '../../assets/camera.svg'

export default function ItemCardapio(props, history) {
    const alert = useAlert();
    const [thumbnail, setThumbnail] = useState(null);
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nome, setNome] = useState('');
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    console.log(thumbnail)
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const id = props.location.state.item;
        data.append('valor', valor);
        data.append('categoria', categoria);
        data.append('nome', nome);
        data.append('descricao', descricao);
        data.append('thumbnail', thumbnail);
        await api.put('/cardapio', data, { headers: { id: id } }).then(
            (r) => {
                if (r.data.errors) {
                    r.data.errors.map((r) => {
                        alert.show(r.message);
                    })
                } else {
                    alert.show('Atualizado!');
                    props.history.push('/cardapio');
                }

            }
        );
    }

    useEffect(() => {
        function fetchData() {
            api.get('/cardapio', { headers: { id: props.location.state.item } }).then((r) => {
                setNome(r.data.nome);
                setValor(r.data.valor)
                setCategoria(r.data.categoria);
                setDescricao(r.data.descricao);
                setThumbnail(r.data.thumbnail);
            });
        }
        fetchData()
    }, [props.location.state.item])
    return (
        <Container>
            <Coluna heigth={100} position="fixed" style={{ position: 'fixed' }}>
                <Menu />
            </Coluna>
            <Coluna width={80} heigth={100} style={{ position: 'absolute', left: '20vw' }}>
                <form onSubmit={handleSubmit} className="f-c ard">
                    <section className="grid ">
                        <div className="item">
                            <label htmlFor="nome">Nome</label><br />
                            <input
                                required
                                className="input"
                                id="nome"
                                value={nome}
                                onChange={event => setNome(event.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="valor">Valor</label><br />
                            <input
                                required
                                className="input"
                                id="valor"
                                value={valor}
                                onChange={event => setValor(event.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="valor">Descricao</label><br />
                            <input
                                required
                                className="input"
                                id="valor"
                                value={descricao}
                                onChange={event => setDescricao(event.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="categoria">Categoria</label><br />
                            <input
                                required
                                id="categoria"
                                value={categoria}
                                className="input"
                                onChange={event => setCategoria(event.target.value)}
                            />
                        </div>
                        <div className="item social">
                            <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}
                                className={thumbnail ? 'has-thumbnail' : ''}
                            >
                                <input type="file" onChange={event => setThumbnail(event.target.files[0])} name="photo" />
                                <img src={`http://localhost:3000/files/${thumbnail}`} alt="Select img" />
                            </label>
                        </div>
                        <button type="submit" className="btn">Alterar</button>
                    </section>
                </form >

            </Coluna>
        </Container>
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