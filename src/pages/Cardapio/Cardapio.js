import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
import { Container, Coluna, Linha } from '../../components/GridArea/GridArea'
import { useAlert } from 'react-alert'
import './Cardapio.css';
const Cardapio = (props, history) => {
    const [data, setData] = useState([])
    const alert = useAlert();
    useEffect(() => {
        var OkAlerta = props.location.state
        console.log(OkAlerta)
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } }).then((r) => { console.log(r.data); setData(r.data.cardapio) })
        }

        fetchData()
    }, [alert, props.location.state]);
    return (
        <Container>
            <Coluna heigth={100} style={{ position: 'fixed' }}>
                <Menu />
            </Coluna>
            <Coluna width={60} heigth={100} style={{ position: 'absolute', left: '20vw' }}>
                {data.map((item, index) => {
                    return (
                        <Linha altura={5} key={index}>
                            <div key={index} onClick={() => { props.history.push({ pathname: 'item', state: { item: item.id } }) }}>
                                <CardCardapio descricao={item.descricao} nome={item.nome} valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} categoria={item.categoria} />
                            </div>
                        </Linha>
                    )
                })}
            </Coluna>
        </Container>
    );
};

export default Cardapio;
