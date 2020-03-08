import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Paper, Checkbox, Button, Fab, Snackbar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MuiAlert from '@material-ui/lab/Alert';
import { getIdBar } from '../../../services/auth';
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
const Funcionamento = (props, location) => {
    const [altera, setAltera] = useState(false);
    const [data, setData] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [hora, setHora] = useState({
        abre: '00:00:00',
        fecha: '00:00:00'
    });
    const getData = () => {
        api.get('/bar/funcionamento', { headers: { id: getIdBar() } }).then(
            (r) => {
                setData(r.data);
            }
        )
    }
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        id_bar: parseInt(getIdBar()),
        seg: false,
        ter: false,
        qua: false,
        qui: false,
        sex: false,
        sab: false,
        dom: false,
    });

    const handleHora = name => event => {
        setHora({ ...state, [name]: event.target.value });
    };
    const handleChangeWeekDays = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    const salvar = () => {
        var element = state, confs = [];
        element.abre = hora.abre;
        element.fecha = hora.fecha;
        confs.push({ confs: element });
        api.put('/bar/funcionamento', { confs }).then(
            (r) => {
                if (r.status === 200) {
                    handleClick();
                    setAltera(true)
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
    React.useEffect(() => {
        getData();
        if (altera === true)
            forceUpdate();
    }, [altera])

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
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">
                    {altera === false ?
                        <>
                            <TextField
                                id="time"
                                label="Abre ás:"
                                type="time"
                                value={data.abre}
                                className={classes.textField}
                                name="abre"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300, }}
                            />
                            <TextField
                                id="time"
                                label="Fecha ás:"
                                type="time"
                                name="fecha"
                                value={data.fecha}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300, }}
                            />
                        </> :
                        <>
                            <TextField
                                id="time"
                                label="Abre ás:"
                                type="time"
                                value={data.abre}
                                name="abre"
                                className={classes.textField}
                                onChange={handleHora('abre')}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300, }}
                            />
                            <TextField
                                id="time"
                                label="Fecha ás:"
                                type="time"
                                value={data.fecha}
                                name="fecha"
                                onChange={handleHora('fecha')}
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

            </Grid>
            {altera === false ?
                <>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.seg === 1 ? true : false}
                                value="seg"
                                name="seg"
                                onChange={handleChangeWeekDays('seg')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />

                            <Typography
                                align="center"
                                noWrap
                            >   Seg
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.ter === 1 ? true : false}
                                value="ter"
                                name="ter"
                                onChange={handleChangeWeekDays('ter')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Ter
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.qua === 1 ? true : false}
                                value="qua"
                                name="qua"
                                onChange={handleChangeWeekDays('qua')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Qua
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.qui === 1 ? true : false}
                                value="qui"
                                name="qui"
                                onChange={handleChangeWeekDays('qui')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Qui
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.sex === 1 ? true : false}
                                value="sex"
                                name="sex"
                                onChange={handleChangeWeekDays('sex')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Sex
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.sab === 1 ? true : false}
                                value="sab"
                                name="sab"
                                onChange={handleChangeWeekDays('sab')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Sab
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.dom === 1 ? true : false}
                                value="dom"
                                name="dom"
                                onChange={handleChangeWeekDays('dom')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Dom
                    </Typography>
                        </Paper>
                    </Grid>
                </> :
                <>

                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.seg}
                                value="seg"
                                name="seg"
                                onChange={handleChangeWeekDays('seg')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />

                            <Typography
                                align="center"
                                noWrap
                            >   Seg
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.ter}
                                value="ter"
                                name="ter"
                                onChange={handleChangeWeekDays('ter')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Ter
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.qua}
                                value="qua"
                                name="qua"
                                onChange={handleChangeWeekDays('qua')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Qua
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.qui}
                                value="qui"
                                name="qui"
                                onChange={handleChangeWeekDays('qui')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Qui
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.sex}
                                value="sex"
                                name="sex"
                                onChange={handleChangeWeekDays('sex')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Sex
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.sab}
                                value="sab"
                                name="sab"
                                onChange={handleChangeWeekDays('sab')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Sab
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.dom}
                                value="dom"
                                name="dom"
                                onChange={handleChangeWeekDays('dom')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Dom
                    </Typography>
                        </Paper>
                    </Grid>
                </>
            }

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

export default Funcionamento;