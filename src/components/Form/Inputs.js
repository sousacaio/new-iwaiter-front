import React from 'react';
const CatInputs = ({ idx, catState, handleCatChange }) => {
    const valorId = `valor-${idx}`;
    const nomeId = `nome-${idx}`;
    const categoriaId = `categoria-${idx}`;
    return (
        <div key={`cardapio-${idx}`} style={{
            display: 'flex',
            height: '10vh',
            flexDirection: 'row',
            boxShadow: ' 0 0 10px',
            margin: '10px',
            background: '#35302D',
            color: 'white',
            borderRadius: '5px',
            fontWeight: 'bold'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '33%',
            }}>
                <div style={{ margin: 'auto' }}>
                    # {idx + 1}
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{ margin: 'auto' }}>
                        <label htmlFor={nomeId}>{`Prato:`}</label>
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <input
                            style={{ padding: '5px', borderColor: 'white', borderRadius: '5px' }}
                            type="text"
                            name={nomeId}
                            data-idx={idx}
                            id={nomeId}
                            className="nome"
                            value={catState[idx].nome}
                            onChange={handleCatChange}
                        />
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '33%',
            }}>
                <div style={{ margin: 'auto' }}>
                    <label htmlFor={valorId}>Valor:</label>
                </div>
                <div style={{ margin: 'auto' }} >
                    <input
                        style={{ padding: '5px', borderColor: 'white', borderRadius: '5px' }}
                        type="text"
                        name={valorId}
                        data-idx={idx}
                        id={valorId}
                        className="valor"
                        value={catState[idx].valor}
                        onChange={handleCatChange}
                    />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
            }}>
                <div style={{ margin: 'auto' }}>
                    <label htmlFor={categoriaId}>Categoria:</label>
                </div>
                <div style={{ margin: 'auto' }}>
                    <input
                        style={{ padding: '5px', borderColor: 'white', borderRadius: '5px' }}
                        type="text"
                        name={categoriaId}
                        data-idx={idx}
                        id={categoriaId}
                        className="categoria"
                        value={catState[idx].categoria}
                        onChange={handleCatChange}
                    />
                </div>
            </div>
        </div >
    );
};


export default CatInputs;

