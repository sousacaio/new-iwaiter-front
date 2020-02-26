import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Paper, Checkbox } from '@material-ui/core'
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
const Funcionamento = (props) => {
    useEffect(() => {

    }, [])
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="time"
                        label="Abre ás:"
                        type="time"
                        value={props.data.data?.abre}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <TextField
                        id="time"
                        label="Abre ás:"
                        type="time"
                        value={props.data.data?.fecha}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                </form>
            </Grid>
            <Divider variant="fullWidth" />
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <Checkbox
                        checked={props.data.data?.seg === 1 ? true : false}
                        value={props.data.data?.seg}
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
                        checked={props.data.data?.ter === 1 ? true : false}
                        value={props.data.data?.ter}
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
                        checked={props.data.data?.qua === 1 ? true : false}
                        value={props.data.data?.qua}
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
                        checked={props.data.data?.qui === 1 ? true : false}
                        value={props.data.data?.qui}
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
                        checked={props.data.data?.sex === 1 ? true : false}
                        value={props.data.data?.sex}
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
                        checked={props.data.data?.sab === 1 ? true : false}
                        value={props.data.data?.sab}
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
                        checked={props.data.data?.dom === 1 ? true : false}
                        value={props.data.data?.dom}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                    >   Dom
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Funcionamento;