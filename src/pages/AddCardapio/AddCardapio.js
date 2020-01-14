import React from 'react';
import { Container, Coluna } from '../../components/GridArea/GridArea'
import Form from '../../components/CatInputs/Form';
import Menu from '../../components/Menu/Menu'
const AddCardapio = () => {
    return (
        <Container >
            <Coluna  heigth={100} position="fixed" style={{ position: 'fixed' }}>
                <Menu />
            </Coluna>
            <Coluna width={60} heigth={100} style={{ position: 'absolute', left: '20vw' }}>
                <Form />
            </Coluna>
        </Container>
    )

}
export default AddCardapio;