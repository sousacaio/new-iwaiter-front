import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import { Cont, Flexcolumn, Flexrow, Button, Input } from '../../components/GridArea/GridArea'
import Funcionamento from '../../components/Configuracoes/Funcionamento/Funcionamento';
import Confs from '../../components/Configuracoes/Confs/Confs';
import Couvert from '../../components/Configuracoes/Couvert/Couvert';
import axios from 'axios';
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import Wrapper from '../../components/Material-ui/Wrapper';
const Configuracoes = () => {
    const [func, setFunc] = useState([]);
    const [couvert, setCouvert] = useState([])
    const [confs, setConfs] = useState([])

    useEffect(() => {
        let randomPromise = Promise.resolve(200);
        axios.all([
            api.get('/bar/couvert', { headers: { id: getIdBar() } }),
            api.get('/bar/funcionamento', { headers: { id: getIdBar() } }),
            api.get('/bar/confs', { headers: { id: getIdBar() } }),
            randomPromise
        ])
            .then((responses) => {
                setConfs(responses[0]);
                setFunc(responses[1])
                setCouvert(responses[2])
            })

    }, [])
    return (
        <Wrapper>
            <Funcionamento data={func} />
            <Couvert data={couvert} />
            <Confs data={confs} />
        </Wrapper>
    )
}

export default Configuracoes;