import React, { useState, useEffect } from 'react';
import Funcionamento from '../../components/Configuracoes/Funcionamento/Funcionamento';
import Couvert from '../../components/Configuracoes/Couvert/Couvert';
import api from '../../services/api';
import { getId } from '../../services/auth'
import Wrapper from '../../components/Material-ui/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    toolbarTitle: {
        flex: 1,
        margin: theme.spacing(2, 2, 2, 2)
    },

}));
const Configuracoes = () => {
    const [data, setData] = useState([]);
    async function fetchData() {
        await api.get(`establishment/${getId()}/settings`).then((r) => {
            if (r) {
                const { data: { data } } = r;
                const { settings } = data[0];
                setData(settings);
            }
        })
    }
    console.log(data)
    useEffect(() => { fetchData() }, []);
    const classes = useStyles()
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
                {/* <Grid item lg={4} md={12} xs={12} sm={12}>
                    <Paper >
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Funcionamento
                        </Typography>
                        <Divider variant="middle" />
                        <Confs data={data} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper  >
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Promoções
                        </Typography>
                        <Divider variant="middle" />
                        <Promos />
                    </Paper>
                </Grid> */}

            </Grid>


        </Wrapper>
    )
}

export default Configuracoes;