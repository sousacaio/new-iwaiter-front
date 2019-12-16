import React from 'react';
const CatInputs = ({ idx, catState, handleCatChange }) => {
    const valorId = `valor-${idx}`;
    const nomeId = `nome-${idx}`;
    const categoriaId = `categoria-${idx}`;
    return (
        <div key={`cardapio-${idx}`}>
            <label htmlFor={nomeId}>{`Nome #${idx + 1}:`}</label>
            <input
                type="text"
                name={nomeId}
                data-idx={idx}
                id={nomeId}
                className="nome"
                value={catState[idx].nome}
                onChange={handleCatChange}
            />
            <label htmlFor={valorId}>Valor:</label>
            <input
                type="text"
                name={valorId}
                data-idx={idx}
                id={valorId}
                className="valor"
                value={catState[idx].valor}
                onChange={handleCatChange}
            />
            <label htmlFor={categoriaId}>Categoria:</label>
            <input
                type="text"
                name={categoriaId}
                data-idx={idx}
                id={categoriaId}
                className="categoria"
                value={catState[idx].categoria}
                onChange={handleCatChange}
            />
        </div>
    );
};


export default CatInputs;

