import React, { useState, useEffect } from 'react';
import Funcionamento from '../../components/Configuracoes/Funcionamento/Funcionamento';
import Confs from '../../components/Configuracoes/Confs/Confs';
import Couvert from '../../components/Configuracoes/Couvert/Couvert';
import Promos from '../../components/Configuracoes/Promos/Promos';
import axios from 'axios';
import api from '../../services/api';
import { getIdBar } from '../../services/auth'
import Wrapper from '../../components/Material-ui/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    toolbarTitle: {
        flex: 1,
        margin: theme.spacing(2, 2, 2, 2)
    },

}));
const Configuracoes = () => {
    const [func, setFunc] = useState([]);
    const [couvert, setCouvert] = useState([])
    const [confs, setConfs] = useState([])

    useEffect(() => {
        let randomPromise = Promise.resolve(200);
        axios.all([
            api.get('/bar/couvert', { headers: { id: getIdBar() } }),
            api.get('/bar/funcionamento', { headers: { id: getIdBar() } }),
            api.get('/bar/confs', { headers: { id: getIdBar() } }),
            randomPromise
        ])
            .then((responses) => {
                setConfs(responses[0]);
                setFunc(responses[1])
                setCouvert(responses[2])
            })

    }, [])
    const classes = useStyles()
    return (
        <Wrapper>
            <Grid container xs={12} spacing={2}>

                 <Grid item lg={4} xs={12} sm={6}>
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
                        <Funcionamento data={func} />
                    </Paper>
                </Grid>
                <Grid item lg={4} xs={12} sm={6}>
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
                        <Couvert data={confs} />
                    </Paper>
                </Grid>
                <Grid item lg={4} xs={12} sm={6}>
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
                        <Confs data={couvert} />
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
                        <Promos  />
                    </Paper>
                </Grid>

            </Grid>


        </Wrapper>
    )
}

export default Configuracoes;