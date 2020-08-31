import React from 'react';
import Funcionamento from '../../components/Configuracoes/Funcionamento/Funcionamento';
import Couvert from '../../components/Configuracoes/Couvert/Couvert';
import Address from '../../components/Configuracoes/Address/Address';
import Wrapper from '../../components/Material-ui/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    toolbarTitle: {
        flex: 1,
        margin: theme.spacing(2, 2, 2, 2)
    },
}));
const Settings = () => {
    const classes = useStyles();
    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid item lg={6} md={8} sm={12} xs={12} >
                    <Paper  >
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Horários
                        </Typography>
                        <Divider variant="middle" />
                        <Funcionamento />
                    </Paper>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Paper >
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Couvert
                        </Typography>
                        <Divider variant="middle" />
                        <Couvert />
                    </Paper>
                </Grid>
                <Grid item lg={12} md={8} sm={12} xs={12} >
                    <Paper  >
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Endereço
                        </Typography>
                        <Divider variant="middle" />
                        <Address />
                    </Paper>
                </Grid>

            </Grid>


        </Wrapper>
    )
}

export default Settings;