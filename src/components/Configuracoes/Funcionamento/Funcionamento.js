import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Paper, Checkbox, Button } from '@material-ui/core';
import { getSettings, saveConfsSettings } from '../../../utils/requisitions/settings'

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
const Funcionamento = () => {
    const [data, setData] = useState([]);
    const [workingDays, setWorkingDays] = useState(['']);

    async function getData() {
        const res = await getSettings();
        const { settings } = res;
        const { settings: { workingDays } } = res;
        setData(settings);
        setWorkingDays(workingDays);
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

    const salvar = async () => {
        const res = await saveConfsSettings(data, workingDays)
        if (res) {
            getData()
        }
    }

    const classes = useStyles();

    useEffect(() => {
        getData()
    }, [])

    return (
        <Grid container spacing={3}>
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