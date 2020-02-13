import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
import ItemCardapio from '../../components/ItemCardapio/ItemCardapio';
import { Cont, Flexrow, Flexcolumn } from '../../components/GridArea/GridArea'
import { useAlert } from 'react-alert'
import './Cardapio.css';
//https://codepen.io/qq7886/pen/MypEvw
const Cardapio = (props, history) => {
    const [data, setData] = useState([]);
    const [nome, setNome] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [filtrados, setFiltrados] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const alert = useAlert();

    const handleNomeChange = (event) => {
        setNome(event.target.value);
        filtraCardapioPorNome();
    }
    const handleCategoriaChange = (event) => {
        setCategoriaFiltro(event.target.value);
    }

    function filtraCardapioPorNome() {
        let profs = data;
        let q = nome;
        profs = profs.filter((profs) => {
            return profs.nome.toLowerCase().indexOf(q) !== -1;
        });
        setFiltrados(profs);
    }
    function filtraCardapioPorCategoria() {
        let profs = data;
        let q = categoriaFiltro;
        profs = profs.filter((profs) => {
            return profs.categoria.toLowerCase().indexOf(q) !== -1;
        });
        setFiltrados(profs);
    }

    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } })
                .then((r) => {
                    setData(r.data.cardapio);
                    setCategoria(r.data.categorias)
                })
        }
        fetchData()
    }, [alert, nome]);
    return (
        <Cont style={{ overflowX: 'hidden' }}>
            <Flexrow size={10}>
                <Flexcolumn size={2}>
                    <Menu />
                </Flexcolumn>
                <Flexcolumn size={8}>
                    <Flexrow>
                        <div className="cardapio-navbar">
                            <input type="text" align="middle"
                                className="brk-btn"
                                value={nome}
                                placeholder="Pesquise por nome"
                                onChange={(event) => handleNomeChange(event)}
                            />
                            <div>
                                <select value={categoriaFiltro} onChange={handleCategoriaChange} className="brk-btn">
                                    <option disabled >Escolha uma das suas categorias </option>
                                    {categoria.map((categorias, index) => (
                                        <option value={categorias}>{categorias} </option>
                                    ))}
                                </select>
                                <div className="brk-btn" onClick={() => filtraCardapioPorCategoria()}>
                                    Pesquisar por categoria
                            </div>
                            </div>
                        </div>
                    </Flexrow>
                    <Flexrow>
                        <div class="masonry">
                            {filtrados.length > 0 ?
                                filtrados.map((item, index) => {
                                    return (
                                        <Flexrow key={index} className="item"  >
                                            <CardCardapio
                                                foto={item.foto}
                                                descricao={item.descricao}
                                                nome={item.nome}
                                                valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                categoria={item.categoria} />
                                            <div id={`popup${item.id}`} className="overlay">
                                                <div className="popup">
                                                    <a className="close" href="#" >&times;</a>
                                                    <div className="content">
                                                        <ItemCardapio id={item.id} />
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={`#popup${item.id}`} >
                                                Editar
                                        </a>
                                        </Flexrow>
                                    )
                                })
                                :
                                data.map((item, index) => {
                                    return (
                                        <Flexrow key={index} className="item"  >

                                            <CardCardapio
                                                foto={item.foto}
                                                descricao={item.descricao}
                                                nome={item.nome}
                                                valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                categoria={item.categoria} />
                                            <div id={`popup${item.id}`} className="overlay">
                                                <div className="popup">
                                                    <a className="close" href="#" >&times;</a>
                                                    <div className="content">
                                                        <ItemCardapio id={item.id} />
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={`#popup${item.id}`} >
                                                Editar
                                            </a>
                                        </Flexrow>

                                    )
                                })}
                        </div>
                    </Flexrow>

                </Flexcolumn>
            </Flexrow>
        </Cont >
    );
};
{/* <div class="box">
                                <a class="button" href="#editar">Let me Pop up</a>
                            </div>
                            <div id="editar" class="overlay">
                                <div class="popup">
                                    <h2>Editar</h2>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">

                                    </div>
                                </div>
                            </div> */}
export default Cardapio;
