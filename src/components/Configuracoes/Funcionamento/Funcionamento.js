import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Paper, Checkbox, Button, Snackbar } from '@material-ui/core';
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
const Funcionamento = (props, location) => {
    const [altera, setAltera] = useState(false);
    const [data, setData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [workingDays, setWorkingDays] = React.useState(['']);
    async function getData() {
        await api.get(`establishment/${getId()}/settings`).then((r) => {
            if (r) {
                const { data: { data } } = r;
                const { settings } = data[0];
                setData(settings);
                setWorkingDays(settings.workingDays);
            }
        })
    }
    const handleHora = name => event => {
        setData({ ...data, [name]: event.target.value });
    };
    const handleChangeWeekDays = (day) => {
        var unmuttedArray = workingDays;
        var newArray = [...unmuttedArray];
        if (!newArray.includes(day)) {
            newArray.push(day)
            setWorkingDays(newArray)
        } else {
            newArray.splice(newArray.indexOf(day), 1);
            setWorkingDays(newArray)
        }
    };
    const salvar = () => {
        api.put(`establishment/${getId()}/settings`, {
            location: data.location,
            couvert: data.couvert,
            gorjeta: data.gorjeta,
            embalagem: data.embalagem,
            openingHours: data.openingHours,
            workingDays,
            closingTime: data.closingTime
        }).then((r) => {
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
    React.useEffect(() => {
        getData();

    }, [altera])

    return (
        <Grid container spacing={3}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Configurações alteradas com sucesso!
                </Alert>
            </Snackbar>
            <Grid item xs={12} >
                <form noValidate autoComplete="off">
                    <TextField
                        id="time"
                        label="Abre ás:"
                        type="time"
                        value={data.openingHours}
                        name="openingHours"
                        className={classes.textField}
                        onChange={handleHora('openingHours')}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <TextField
                        id="time"
                        label="Fecha ás:"
                        type="time"
                        value={data.closingTime}
                        name="closingTime"
                        onChange={handleHora('closingTime')}
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

            </Grid>
            {data.workingDays ?
                <>
                    <Grid item xs={4} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('seg')}
                                value="seg"
                                name="seg"
                                onChange={() => handleChangeWeekDays('seg')}
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
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('ter')}
                                value="ter"
                                name="ter"
                                onChange={() => handleChangeWeekDays('ter')}
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
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('qua')}
                                value="qua"
                                name="qua"
                                onChange={() => handleChangeWeekDays('qua')}
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
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('qui')}
                                value="qui"
                                name="qui"
                                onChange={() => handleChangeWeekDays('qui')}
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
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('sex')}
                                value="sex"
                                name="sex"
                                onChange={() => handleChangeWeekDays('sex')}
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
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('sab')}
                                value="sab"
                                name="sab"
                                onChange={() => handleChangeWeekDays('sab')}
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
                    <Grid item xs={3} >
                        <Paper className={classes.paper}>
                            <Checkbox
                                checked={workingDays.includes('dom')}
                                value="dom"
                                name="dom"
                                onChange={() => handleChangeWeekDays('dom')}
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
                </> : ''
            }
            <Divider variant="fullWidth" />
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Button variant="contained" size="small" color="primary" onClick={salvar} className={classes.margin}>
                    Salvar
                </Button>

            </Grid>
        </Grid>
    )
}

export default Funcionamento;