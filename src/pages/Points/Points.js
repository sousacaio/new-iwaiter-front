import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup'
import Wrapper from '../../components/Material-ui/Wrapper';
import { Paper, Grid, Toolbar, Typography, TextField, Button, Checkbox } from '@material-ui/core'
import { useStyles } from './styles';
import { deleteUniquePoint, checkAndBringPoints, createNewPoint } from '../../utils/requisitions/points'
const Points = () => {
    const [points, setPoints] = useState([]);
    const [newPoints, setNewPoints] = useState(0);
    const [mustReload, setMustReload] = useState(false);
    useEffect(() => {
        async function checkCount() {
            const responsePoints = await checkAndBringPoints();
            setPoints(responsePoints)
        }
        checkCount();
    }, [mustReload]);
    const handleDelete = async (idPoint) => {
        const result = await deleteUniquePoint(idPoint);
        if (result) {
            setMustReload(!mustReload)
        }
    }
    const handleSave = async () => {
        const savedPoint = await createNewPoint(points, newPoints);
        if (savedPoint) {
            setMustReload(!mustReload)
        }
    }

    const classes = useStyles();
    return (
        <Wrapper>
            <> <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper >
                        <Toolbar>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="inherit"
                                align="center"
                                noWrap
                                className={classes.toolbarTitle}
                            >
                                Número de mesas:
                                {points && points.length > 0 ?
                                    <CountUp
                                        end={points.length}
                                        duration={2}
                                    /> : <CountUp
                                        end={0}
                                        duration={2}
                                    />}
                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.toolbarTitle}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Numero da mesa"
                            name="Numero da mesa"
                            autoComplete="lname"
                            type="number"
                            className={classes.input}
                            onChange={e => setNewPoints(e.target.value)}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            className={classes.input}
                        >
                            Adicionar mesas
                     </Button>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} style={{ backgroundColor: '#3f51b5' }}>
                                <Typography
                                    component="h2"
                                    variant="h5"
                                    align="center"
                                    noWrap
                                    className={classes.toolbarTitle}
                                    style={{ color: '#fff' }}
                                >
                                    Clique no número da mesa para excluí-la:
                                </Typography>
                            </Paper>
                        </Grid>
                        {points && points.map((point) => {
                            const ocupada = point.ocupied === true ? true : false;
                            const ocupiedBg = point.ocupied === true ? 'green' : '#fff';
                            const ocupiedFonte = point.ocupied === true ? '#fff' : 'black';
                            return (
                                <Grid item xs={2} key={point._id}>
                                    <Paper className={classes.paper} style={{ backgroundColor: ocupiedBg }}>
                                        <Checkbox
                                            disabled={ocupada}
                                            checked={ocupada}
                                            onChange={() => handleDelete(point._id)}
                                            value={point._id}
                                            style={{ color: ocupiedFonte }}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <Typography
                                            align="center"
                                            noWrap
                                            className={classes.toolbarTitle}
                                            style={{ color: ocupiedFonte }}
                                        >   {point.num}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
            </>

        </Wrapper>
    );
};


export default Points;
