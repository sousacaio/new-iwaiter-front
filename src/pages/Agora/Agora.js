import React, { useState, useEffect } from 'react';
import './Agora.css';
import { getIdBar } from '../../services/auth';
import api from '../../services/api';
import Menu from '../../components/Menu/Menu';
import Card from '../../components/Cards/Card';
import { Container, Coluna } from '../../components/GridArea/GridArea'
import Wrapper from '../../components/Material-ui/Wrapper';
/*
*Falta fazer:
*Tratamento dos dados 
*Renderização condicional
*Renderizar os dados dos pedidos nas mesas
*/
const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getMesas() {
            api.get('/mesas', { headers: { id: getIdBar() } })
                .then((r) => {
                    setData(r.data.mesas);
                })
        }
        getMesas();
    }, []);
    return (
        <Wrapper>

            {data.map((i) => {
                return <div key={i.id} >
                    <Card ocupado={i.ocupada} numero={i.numero} id={i.id} />
                </div>
            })}
        </Wrapper>

    );
}
export default App;
        // <Container>
        //     <Coluna width={20} height={100} position="fixed" style={{ position: 'fixed' }}>
        //         <Menu />
        //     </Coluna>
        //     <Coluna width={80} heigth={100} style={{ position: 'absolute', left: '20vw' }}>
        //         {data.map((i) => {
        //             return <div key={i.id} >
        //                 <Card ocupado={i.ocupada} numero={i.numero} id={i.id} />
        //             </div>
        //         })}
        //     </Coluna  >
        // </Container>