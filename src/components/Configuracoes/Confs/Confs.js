import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, TextField, Button, Fab, Snackbar } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import MuiAlert from '@material-ui/lab/Alert';
import { getIdBar,getToken } from '../../../services/auth';
import api from '../../../services/api';
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
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Confs = (props) => {
    const classes = useStyles();
    const [altera, setAltera] = useState(false);
    const [data, setData] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [open, setOpen] = React.useState(false);
    const [confs, setConfs] = useState({
        id_bar: parseInt(getIdBar()),
        gorjeta: 0,
        embalagem: 0
    })
    const handleConf = name => event => {
        setConfs({ ...confs, [name]: event.target.value });
    };
    const handleClick = () => {
        setOpen(true);
    };
    const alterar = () => {
        setAltera(!altera)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const getData = () => {
        api.get('/bar/confs', { headers: { id: getIdBar(), token: getToken() } }).then(
            (r) => {
                setData(r.data);
            }
        )
    }
    const salvar = () => {
        api.put('/bar/confs', { confs }, { headers: { token: getToken() } }).then(
            (r) => {
                if (r.status === 200) {
                    handleClick();
                    setAltera(true)
                }
            }
        );
    }
    useEffect(() => {
        getData();
        if (altera === true)
            forceUpdate();
    }, [altera, forceUpdate])
    return (
        <Grid container spacing={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Configurações alteradas com sucesso!
                </Alert>
            </Snackbar>
            <Fab color={altera === false ? 'primary' : 'secondary'} aria-label="edit" style={{ marginRight: '0px' }} onClick={alterar}>
                <EditIcon />
            </Fab>
            <Grid item lg={4} xs={12} sm={6}>
                <form className={classes.root} noValidate autoComplete="off">
                    {altera === false ? <>
                        <TextField
                            id="time"
                            label="Gorjeta"
                            type="text"
                            value={data.gorjeta}
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
                            className={classes.textField}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300, }}
                        />
                    </>
                        :
                        <>
                            <TextField
                                id="time"
                                label="Gorjeta"
                                type="text"
                                value={confs.gorjeta}
                                name="gorjeta"
                                onChange={handleConf('gorjeta')}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300, }}
                            />
                            <Divider variant="fullWidth" />
                            <TextField
                                id="time"
                                label="Embalagem"
                                type="text"
                                value={confs.embalagem}
                                name="embalagem"
                                onChange={handleConf('embalagem')}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300, }}
                            />
                        </>

                    }
                </form>
            </Grid>
            <Divider variant="fullWidth" />
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {altera === false ? '' :
                    <Button variant="contained" size="small" color="secondary" onClick={salvar} className={classes.margin}>
                        Salvar
                </Button>}
            </Grid>

        </Grid>
    )
}

export default Confs;