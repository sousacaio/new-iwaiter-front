import React, { useState, useEffect } from 'react';
import { Grid, Divider, TextField, Button } from '@material-ui/core'
import { getSettings, saveCouvertSettings } from '../../../utils/requisitions/settings';
import { useStyles } from './styles';
const Couvert = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const getData = async () => {
        const response = await getSettings()
        if (response) {
            setData(response);
        }
    }
    const handleValor = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    const salvar = async () => {
        const response = await saveCouvertSettings(data)
        if (response) {
            setShouldUpdate(!shouldUpdate)
        }
    }

    useEffect(() => {
        getData();
    }, [shouldUpdate])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">

                    <TextField
                        label="Valor"
                        type="text"
                        value={data.couvert}
                        onChange={handleValor('couvert')}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <TextField
                        id="time"
                        label="Gorjeta"
                        type="text"
                        value={data.gorjeta}
                        name="gorjeta"
                        onChange={handleValor('gorjeta')}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, }}
                    />
                    <Divider variant="fullWidth" />
                    <TextField
                        id="time"
                        label="Embalagem"
                        type="text"
                        value={data.embalagem}
                        name="embalagem"
                        onChange={handleValor('embalagem')}
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

                <Button variant="contained"
                    size="small"
                    color="primary"
                    onClick={salvar}
                    className={classes.margin}>
                    Salvar
                </Button>

            </Grid>
        </Grid>
    )
}

export default Couvert;