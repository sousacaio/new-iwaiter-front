import React from 'react';
import { Flexcolumn, Flexrow, TotalRow, TotalColumn } from '../../components/GridArea/GridArea';
import Form from '../../components/CatInputs/Form';
import Menu from '../../components/Menu/Menu'
const AddCardapio = () => {
    return (
        <Flexrow size={12}>
            <Flexcolumn size={3}>
                <Menu />
            </Flexcolumn>
            <Flexcolumn size={9}>
                <Form />
            </Flexcolumn>
        </Flexrow>
    )

}
export default AddCardapio;