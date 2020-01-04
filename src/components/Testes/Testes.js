import React from 'react';
import { Flexcolumn, Flexrow } from '../GridArea/GridArea'
const Teste = () => {
    return (
        <div>
            <Flexrow altura={12}>
                <Flexcolumn size={3}>
                    <h1>12</h1>
                </Flexcolumn>
                <Flexcolumn size={9}>
                    <h1>12</h1>
                </Flexcolumn>
            </Flexrow>
        </div>
    )
}

export default Teste;