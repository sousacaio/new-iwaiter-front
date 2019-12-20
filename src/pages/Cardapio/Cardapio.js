import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
const Cardapio = (props) => {
    const [data, setData] = useState([[]])

    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } }).then((r) => { setData(r.data) })
        }
        fetchData()
    }, []);
    return (
        <div className="grid-template-areas">
            <div>
                <Menu />
            </div>
            <div style={{ position: 'absolute', left: '300px' }}>
                {data.map((item, index) => {
                    return (
                        <div key={index} onClick={() => { props.history.push({ pathname: 'item', state: { item: item._id } }) }}>
                            <CardCardapio nome={item.nome} valor={item.valor} categoria={item.categoria} />
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default Cardapio;