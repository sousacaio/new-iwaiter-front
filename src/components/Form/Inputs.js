import React from 'react';
import { Grid,  Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    submit: {
        margin: theme.spacing(0),
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        margin: theme.spacing(2, 0, 2, 2),
        width: '90%'
    }
}));
const CatInputs = ({ idx, catState, handleCatChange }) => {
    const valorId = `valor-${idx}`;
    const nomeId = `nome-${idx}`;
    const categoriaId = `categoria-${idx}`;
    const classes = useStyles();
    return (
        <Grid item xs={12} key={`cardapio-${idx}`}>
            <Paper className={classes.paper} >

                <div  >
                    <div >
                        <div >
                            <div >
                                <label htmlFor={nomeId}>{`Prato:`}</label>
                            </div>
                            <div >
                                <input
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
                    <div >
                        <div >
                            <label htmlFor={valorId}>Valor:</label>
                        </div>
                        <div  >
                            <input

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
                    <div>
                        <div >
                            <label htmlFor={categoriaId}>Categoria:</label>
                        </div>
                        <div >
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
                    </div>
                </div >
            </Paper>
        </Grid>
    );
};


export default CatInputs;

