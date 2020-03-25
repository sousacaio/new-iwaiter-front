import React, { useState, useEffect } from 'react';
import { getIdBar } from '../../services/auth';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid, Paper } from '@material-ui/core'
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
                    return <Grid item lg={4} xs={12} sm={6}>
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
                <FormRow />
            </Grid>
        </Wrapper>

    );
}
export default App;