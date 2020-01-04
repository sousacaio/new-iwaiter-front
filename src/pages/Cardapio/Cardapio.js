import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import CardCardapio from '../../components/Cards/CardCardapio'
import { Flexcolumn, Flexrow, TotalColumn, TotalRow } from '../../components/GridArea/GridArea'
import { useAlert } from 'react-alert'
import './Cardapio.css';
const Cardapio = (props) => {
    const [data, setData] = useState([])
    const alert = useAlert()
    var OkAlerta =props.location.state && props.location.state.ok;
    console.log(OkAlerta)
    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } }).then((r) => { console.log(r.data); setData(r.data.cardapio) })
        }
        if(OkAlerta === 'ok'){
            alert.show('Item atualizado com sucesso!')
            OkAlerta = null;            
        }
        fetchData()
    }, []);
    return (
        <Flexrow altura={12}>
            <Flexcolumn size={3}>
                <Menu />
            </Flexcolumn>
            <Flexcolumn size={9}>
                <TotalColumn size={10}>
                    
                    {data.map((item, index) => {
                        return (
                            <TotalRow altura={3}>
                                <div key={index} onClick={() => { props.history.push({ pathname: 'item', state: { item: item.id } }) }}>
                                    <CardCardapio descricao={item.descricao} nome={item.nome} valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} categoria={item.categoria} />
                                </div>
                            </TotalRow>
                        )
                    })}
                    {OkAlerta}
                </TotalColumn>
            </Flexcolumn>
        </Flexrow>
    );
};

export default Cardapio;
