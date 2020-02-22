import React, { useState, useEffect } from 'react';

const Funcionamento = (props) => {
    console.log(props)
    useEffect(() => {

    }, [])
    return (
        <>
            {JSON.stringify(props)}
        </>
    )
}

export default Funcionamento;