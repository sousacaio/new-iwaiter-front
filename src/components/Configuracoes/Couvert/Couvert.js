import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Paper, Checkbox, Button, Fab, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { getIdBar } from '../../../services/auth';
import api from '../../../services/api';
import EditIcon from '@material-ui/icons/Edit';
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
    const [altera, setAltera] = useState(false);
    const [, updateState] = React.useState();
    const [data, setData] = useState([])
    const forceUpdate = useCallback(() => updateState({}), []);
    const [valor, setValor] = useState(0);
    const getData = () => {
        api.get('/bar/couvert', { headers: { id: getIdBar() } }).then(
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

    const handleValor = event => {
        setValor(event.target.value);
    };
    const handleChangeWeekDays = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    const salvar = () => {
        var element = state, confs = [];
        element.valor = valor;
        confs.push({ confs: element });
        api.put('/bar/couvert', { confs }).then(
            (r) => {
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
    }, [altera,forceUpdate])
    return (
        <Grid container spacing={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Configurações de couvert alteradas com sucesso!
                </Alert>
            </Snackbar>
            <Fab color={altera === false ? 'primary' : 'secondary'} aria-label="edit" style={{ marginRight: '0px' }} onClick={alterar}>
                <EditIcon />
            </Fab>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">
                    {altera === false ?
                        <TextField
                            label="Valor"
                            type="text"
                            value={data.valor}
                            disabled
                            className={classes.textField}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300, }}
                        />
                        :
                        <TextField
                            label="Valor"
                            type="text"
                            name="valor"
                            required
                            value={valor}
                            onChange={handleValor}
                            className={classes.textField}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300, }}
                        />
                    }

                </form>
            </Grid>
            <Divider variant="fullWidth" />
            {altera === false ?
                <>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.seg === 1 ? true : false}
                                value={data.seg}
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
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={data.ter === 1 ? true : false}
                                value={data.ter}
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
                                value={data.qua}
                                color="primary"
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
                                checked={data.qui === 1 ? true : false}
                                value={data.qui}
                                color="primary"
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
                                checked={data.sex === 1 ? true : false}
                                value={data.sex}
                                color="primary"
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
                                checked={data.sab === 1 ? true : false}
                                value={data.sab}
                                color="primary"
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
                                checked={data.dom === 1 ? true : false}
                                value={data.dom}
                                color="primary"
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
                :
                <>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.seg}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('seg')}
                                name="seg"
                            />
                            <Typography
                                align="center"
                                noWrap
                            >   Seg
                    </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={state.ter}
                                name="ter"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('ter')}
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
                                name="qua"
                                checked={state.qua}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('qua')}
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
                                name="qui"
                                checked={state.qui}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('qui')}
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
                                name="sex"
                                checked={state.sex}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('sex')}
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
                                name="sab"
                                checked={state.sab}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('sab')}
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
                                name="domg"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={handleChangeWeekDays('dom')}
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
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {altera === false ? '' :
                    <Button variant="contained"
                        size="small"
                        color="secondary"
                        onClick={salvar}
                        className={classes.margin}>
                        Salvar
                </Button>}

            </Grid>
        </Grid>
    )
}

export default Couvert;