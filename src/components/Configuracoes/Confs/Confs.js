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
const Confs = (props) => {
    const classes = useStyles();
    useEffect(() => { }, [])
    return (
        <Grid container>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="time"
                        label="Gorjeta"
                        type="text"
                        value={props.data.data?.gorjeta}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <Divider variant="fullWidth" />
                    <TextField
                        id="time"
                        label="Embalagem"
                        type="text"
                        value={props.data.data?.embalagem}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                </form>
            </Grid>


        </Grid>
    )
}

export default Confs;