import React, { useEffect, useState } from 'react';
import Form from '../../components/CatInputs/Form';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
const Cardapio = () => {
    const [data, setData] = useState([[]])
    useEffect(() => {
        function fetchData() {
            api.get('/cardapio', { headers: { id: getIdBar() } }).then((r) => { console.log(r) })
        }
        fetchData()
    }, []);
    return (
        <>
            <Form />
            <Menu />

        </>
    );
};

export default Cardapio;