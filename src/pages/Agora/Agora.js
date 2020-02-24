import React, { useState, useEffect } from 'react';
import './Agora.css';
import { getIdBar } from '../../services/auth';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../../components/Material-ui/Wrapper';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Deposits from '../../components/Material-ui/Cards';
/*
*Falta fazer:
*Tratamento dos dados 
*Renderização condicional
*Renderizar os dados dos pedidos nas mesas
*/
const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getMesas() {
            api.get('/mesas', { headers: { id: getIdBar() } })
                .then((r) => {
                    setData(r.data.mesas);
                })
        }
        getMesas();
    }, []);
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: '100%',
            height: '100%',
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    function FormRow() {
        return (
            <React.Fragment>
                {data.map((i) => {
                    const bg = i.ocupada === 'sim' ? '#3f51b5' : '';
                    const fontColor = i.ocupada === 'sim' ? '#ffffff' : '';
                    return <Grid item xs={4}>
                        <Paper className={classes.paper} style={{ backgroundColor: bg, color: fontColor }}>
                            <Deposits ocupado={i.ocupada} numero={i.numero} id={i.id} />
                        </Paper>
                    </Grid>

                })}
            </React.Fragment>
        );
    }
    const classes = useStyles();
    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </Wrapper>

    );
}
export default App;