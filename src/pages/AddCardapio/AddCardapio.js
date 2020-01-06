import React from 'react';
import { Flexcolumn, Flexrow, TotalColumn } from '../../components/GridArea/GridArea';
import Form from '../../components/CatInputs/Form';
import Menu from '../../components/Menu/Menu'
const AddCardapio = () => {
    return (
        <Flexrow size={12}>
            <Flexcolumn size={3} flutua={true}>
                <Menu />
            </Flexcolumn>
            <Flexcolumn size={9}>
                <TotalColumn absoluto={true}>
                    <Form />
                </TotalColumn>
            </Flexcolumn>
        </Flexrow>
    )

}
export default AddCardapio;