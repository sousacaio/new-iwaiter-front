import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, TextField, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { getId } from '../../../services/auth';
import api from '../../../services/api';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
    toolbarTitle: {
        flex: 1,
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    checkboxInterna: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxExterna: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));

const Couvert = (props) => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [altera, setAltera] = useState(false);
    const getData = async () => {
        await api.get(`establishment/${getId()}/settings`).then((r) => {
            if (r) {
                const { data: { data } } = r;
                const { settings } = data[0];
                setData(settings);
            }
        })
    }
    const handleValor = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    const salvar = () => {
        api.put(`establishment/${getId()}/settings`, data).then((r) => {
            if (r.status === 200) {
                handleClick();
                alterar();
            }
        }
        );
    }
    const alterar = () => {
        setAltera(!altera)
    }

    const classes = useStyles();
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        getData();
        if (altera === true) {
            forceUpdate();
        }
    }, [altera, forceUpdate])
    return (
        <Grid container spacing={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Configurações de couvert alteradas com sucesso!
                </Alert>
            </Snackbar>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">

                    <TextField
                        label="Valor"
                        type="text"
                        value={data.couvert}
                        onChange={handleValor('couvert')}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <TextField
                        id="time"
                        label="Gorjeta"
                        type="text"
                        value={data.gorjeta}
                        name="gorjeta"
                        onChange={handleValor('gorjeta')}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <Divider variant="fullWidth" />
                    <TextField
                        id="time"
                        label="Embalagem"
                        type="text"
                        value={data.embalagem}
                        name="embalagem"
                        onChange={handleValor('embalagem')}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />

                </form>
            </Grid>
            <Divider variant="fullWidth" />

            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >

                <Button variant="contained"
                    size="small"
                    color="primary"
                    onClick={salvar}
                    className={classes.margin}>
                    Salvar
                </Button>

            </Grid>
        </Grid>
    )
}

export default Couvert;