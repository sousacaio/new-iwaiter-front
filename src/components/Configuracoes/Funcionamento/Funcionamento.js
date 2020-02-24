import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, TextField, Button, Checkbox } from '@material-ui/core'
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
const Funcionamento = (props) => {
    useEffect(() => {

    }, [])
    const classes = useStyles()
    return (
        <Grid container>
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
            <Grid item xs={12} className={classes.checkboxExterna}>
                <Grid item xs={12} >
                    <Grid item xs={12} className={classes.checkboxInterna}>
                        <Checkbox
                            checked={props.data.data?.seg}
                            value={props.data.data?.seg}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Segunda
                    {props.data.data?.seg}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.ter}
                        value={props.data.data?.ter}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Terça
                    {props.data.data?.ter}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.qua}
                        value={props.data.data?.qua}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Quarta
                    {props.data.data?.qua}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.qui}
                        value={props.data.data?.qui}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Quinta
                    {props.data.data?.qui}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.sex}
                        value={props.data.data?.sex}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Sexta
                    {props.data.data?.sex}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.sab}
                        value={props.data.data?.sab}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Sabado
                    {props.data.data?.sab}
                    </Typography>
                    <Checkbox
                        checked={props.data.data?.dom}
                        value={props.data.data?.dom}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >Sabado
                    {props.data.data?.dom}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Funcionamento;