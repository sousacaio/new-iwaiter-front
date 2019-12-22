import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
import { Container, Column } from '../../components/areaComponents';
import './Cardapio.css';
const Cardapio = (props) => {
    const [data, setData] = useState([[]])

    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } }).then((r) => { setData(r.data) })
        }
        fetchData()
    }, []);
    return (
        <Container>
            <Column grid="12">  <Menu /></Column>
            <Column>
                {data.map((item, index) => {
                    return (
                        <div key={index} onClick={() => { props.history.push({ pathname: 'item', state: { item: item.id } }) }}>
                            <CardCardapio descricao={item.descricao} nome={item.nome} valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} categoria={item.categoria} />
                        </div>
                    )
                })}</Column>
        </Container>
    );
};

export default Cardapio;
