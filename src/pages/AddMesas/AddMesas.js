import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import CountUp from 'react-countup'
import Wrapper from '../../components/Material-ui/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Toolbar, Typography, TextField, Button, Checkbox } from '@material-ui/core'
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
const AddMesas = (props) => {
    const [qtdInicial, setQtdInicial] = useState('');
    const [numero, setNumero] = useState(0);
    const mesaObjeto = { id_bar: getIdBar(), ocupada: 'nao', numero: '' };
    /*Aplicando imutabilidade no state*/
    const [mesaState, setMesa] = useState([{ ...mesaObjeto },]);
    const [mesas, setMesas] = useState([]);

    const addPorNumero = (numero) => {
        var arr = [];
        var len = numero;
        for (var i = 0; i < len; i++) {
            arr.push({
                numero: i + 1,
                id_bar: getIdBar(),
                ocupada: 'nao'
            });
        }
        return arr;
    }

    const handleCardapioChange = (e) => {
        const updatedCardapio = [...mesaState];
        updatedCardapio[e.target.dataset.idx][e.target.className] = e.target.value;
        setMesa(updatedCardapio);
    };
    function checa() {
        api.get('/mesacheck', { headers: { id: getIdBar() } }).then(r => {
            setQtdInicial(r.data)
        });
    }
    function adicionar() {
        const resultado = addPorNumero(numero);
        api.post('/mesa', { quantidade: resultado, id_bar: getIdBar() }).then(r => {
            checa(r);
            setMesas(r.data)
            window.location.reload();
        });
    }
    useEffect(() => {
        function checkCount() {
            api.get('/mesacheck', { headers: { id: getIdBar() } }).then(r => {
                setQtdInicial(r.data);
                r.data > 0 ? api.get('/mesas', { headers: { id: getIdBar() } }).then(r => {
                    setMesas(r.data.mesas);
                }) : setMesas(0)
            });
        }
        checkCount();
    }, []);
    return (
        <Wrapper>
            {qtdInicial === 0 ?
                <> No momento vc n tem nenhuma mesa,escolha a quantidade de mesas:
                        <input
                        className="mesas-input" type="number"
                        value={numero} onChange={e => setNumero(e.target.value)}
                    />
                    <input
                        type="button"
                        className="brk-btn"
                        value="Adicionar"
                        onClick={adicionar}
                    />
                </>
                : <AddMais qtd={qtdInicial}
                    mesas={mesas}
                    mesaState={mesaState}
                    handleMesaChange={handleCardapioChange}
                    adicionar={adicionar}

                />}
        </Wrapper>
    );
};

const AddMais = (props) => {
    const { mesas } = props;
    const [novasMesas, setNovasMesas] = useState('');

    const handleCheck = (event) => {
        const id = event.target.value;
        //console.log(id)
        api.delete('/mesa', { data: { id } }).then(
            (r) => {
                console.log(r)
                window.location.reload()
            }

        );
    }
    const addPorNumero = (numero, iniciaEm) => {
        var title = [];
        if (parseInt(numero) > parseInt(iniciaEm)) {
            for (var i = parseInt(iniciaEm) - 1; i < parseInt(numero); i++) {
                title.push({
                    numero: (i + 1),
                    id_bar: getIdBar(),
                    ocupada: 'nao'
                });
            }
        } else {
            let soma = (parseInt(iniciaEm) + parseInt(numero));
            for (let i = parseInt(iniciaEm) - 1; i < soma; i++) {
                title.push({
                    numero: (i + 1),
                    id_bar: getIdBar(),
                    ocupada: 'nao'
                });
            }
        }
        let filtered = title.filter(function (el) { return el != null });
        let arrayLimpo = filtered.slice(1)
        api.post('/mesa', { quantidade: arrayLimpo, id_bar: getIdBar() }).then(r => {
            console.log(r)
            window.location.reload()
        });
    }
 
    const addNovaMesa = () => {
        const temNumero = mesas[mesas.length - 1]
        addPorNumero(novasMesas, temNumero?.numero);
    }
    useEffect(() => {
    }, [novasMesas, mesas])
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper >
                        <Toolbar>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="inherit"
                                align="center"
                                noWrap
                                className={classes.toolbarTitle}
                            >
                                Número de mesas:
                                <CountUp
                                    end={mesas.length}
                                    duration={2}
                                />

                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.toolbarTitle}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Numero de mesas"
                            name="Numero de mesas"
                            autoComplete="lname"
                            type="number"
                            className={classes.input}
                            onChange={e => setNovasMesas(e.target.value)}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={addNovaMesa}
                            className={classes.input}
                        >
                            Adicionar mesas
                     </Button>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} style={{ backgroundColor: '#3f51b5' }}>
                                <Typography
                                    component="h2"
                                    variant="h5"
                                    align="center"
                                    noWrap
                                    className={classes.toolbarTitle}
                                    style={{ color: '#fff' }}
                                >
                                    Clique no número da mesa para excluí-la:
                                </Typography>
                            </Paper>
                        </Grid>
                        {mesas.map((mesa) => {
                            console.log(mesa)
                            const ocupada = mesa.ocupada === 'sim' ? true : false;
                            const ocupadaBg = mesa.ocupada === 'sim' ? 'red' : '#fff';
                            const ocupadaFonte = mesa.ocupada === 'sim' ? '#fff' : 'black';
                            return (
                                <Grid item xs={2}>
                                    <Paper className={classes.paper} style={{ backgroundColor: ocupadaBg }}>
                                        <Checkbox
                                            disabled={ocupada}
                                            checked={ocupada}
                                            onChange={e => handleCheck(e)}
                                            value={mesa.id}
                                            style={{ color: ocupadaFonte }}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <Typography
                                            align="center"
                                            noWrap
                                            className={classes.toolbarTitle}
                                            style={{ color: ocupadaFonte }}
                                        >
                                            {mesa.numero}
                                        </Typography>


                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default AddMesas;
