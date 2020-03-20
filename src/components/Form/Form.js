import React, { useState } from 'react';
import CatInputs from './Inputs';
import { getIdBar, getToken } from '../../services/auth';
import api from '../../services/api';
import { Fab, Button, Divider, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
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

//https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f
const Form = () => {
    const blankCardapio = { id_bar: getIdBar(), nome: '', valor: '', categoria: '' };
    const [cardapioState, setCardapioState] = useState([{ ...blankCardapio },]);
    const addCardapio = () => {
        setCardapioState([...cardapioState, { ...blankCardapio }]);
    };
    const handleCardapioChange = (e) => {
        const updatedCardapio = [...cardapioState];
        updatedCardapio[e.target.dataset.idx][e.target.className] = e.target.value;
        setCardapioState(updatedCardapio);
    };

    function addProdCardapio() {
        api.post('/cardapio', { cardapioState }, { headers: { _id: getIdBar(), token: getToken() } }).then((r) => {
            alert(r.data.message)
        })
    }
    const classes = useStyles();
    return (
        <div>
            <Grid container item xs={12} spacing={3}>
                {cardapioState.map((val, idx) => (
                    <Grid item xs={4}>
                        <Paper className={classes.paper} >
                            <CatInputs
                                key={`cardapio-${idx}`}
                                idx={idx}
                                catState={cardapioState}
                                handleCatChange={handleCardapioChange}
                            />
                            <Divider variant="fullWidth" />
                        </Paper>
                    </Grid>))}
            </Grid>
            <br />
            <Button variant="contained" onClick={() => addProdCardapio()} color="primary" fullWidth>
                Adicionar
            </Button>
            <Fab color="primary" onClick={addCardapio} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Form;