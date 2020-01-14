import React, { useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { Container, Coluna } from '../../components/GridArea/GridArea'
const AddMesas = (props) => {
    const [qtd, setQtd] = useState(0);
    function handleChange(event) {
        setQtd(event.target.value);
    }
    console.log(qtd)
    return (
        <Container >
            <Coluna heigth={100} position="fixed" style={{ position: 'fixed' }}>
                <Menu />
            </Coluna>
            <Coluna width={60} heigth={100} style={{ position: 'absolute', left: '20vw' }}>

                Quantas mesas deseja adicionar?
                        <form>
                    <input
                        onChange={handleChange}
                    />
                </form>
            </Coluna>
        </Container>
    );
};

export default AddMesas;
