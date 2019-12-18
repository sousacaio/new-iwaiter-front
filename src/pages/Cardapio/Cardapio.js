import React, { useEffect, useState } from 'react';
import Form from '../../components/CatInputs/Form';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
import ModalCardapio from '../../components/Modal/ModalCardapio'
const Cardapio = (props) => {
    const [data, setData] = useState([[]])

    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } }).then((r) => { setData(r.data) })
        }
        fetchData()
    }, []);
    return (
        <>
            <div className="grid grid-template-columns-1 ">
                {data.map((item, index) => {
                    return (
                        <div key={index} onClick={() => { props.history.push({ pathname: 'item', state: { item: item._id } }) }}>
                            <CardCardapio nome={item.nome} valor={item.valor} categoria={item.categoria} />
                        </div>
                    )
                })}
            </div>
            <Menu />
        </>
    );
};

export default Cardapio;