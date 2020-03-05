import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Divider, InputLabel, MenuItem, FormHelperText, FormControl, Select, Table, TableBody, TableCell,
    TableHead, TableRow, TextField, Button
} from '@material-ui/core'
import api from '../../../services/api';
import { getIdBar } from '../../../services/auth';
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    btn: {
        margin: theme.spacing(3),
        width: ' '
    }
}));

const Promos = (props) => {
    const [age, setAge] = React.useState('');
    const [promos, setPromos] = useState([]);
    const [cardapios, setCardapios] = useState([]);
    const [cat, setCat] = useState([]);

    const handleChange = event => {
        setAge(event.target.value);
    };
    useEffect(() => {
        async function getPromos() {
            await api.get('/bar/promos').then(
                (result) => {
                    setPromos(result.data.promo)
                }
            );
        }
        async function getCardapios() {
            await api.get('/cardapios', { headers: { id: getIdBar() } }).then(
                (result) => {
                    setCardapios(result.data.cardapio)
                    setCat(result.data.categorias)
                }
            );
        }
        getCardapios()
        getPromos()
    }, []);
    const classes = useStyles()
    return (
        <Grid container spacing={12}>
            <Grid container xs={12}>
                <Grid xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Produto</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            onChange={handleChange}
                        >
                            {cardapios.map((item) => (
                                <MenuItem value={item.id}>{item.nome}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Escolha o produto que você deseja dar desconto!</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            onChange={handleChange}
                        >
                            {cat.map((item,ids) => (
                                <MenuItem value={ids}>{item}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Escolha a categoria que você deseja dar desconto!</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <FormControl className={classes.formControl}>
                        <TextField id="Valor" label="Porcentagem" fullWidth helperText="A quantia que você quer aplicar de desconto sobre o produto" />
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <Button variant="contained" className={classes.btn} color="primary">Habilitar desconto</Button>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" />
            <Grid container xs={12} >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell>Porcentagem</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Valor final</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promos.map((promocoes, id) => {
                            const porcentagem = (parseInt(promocoes.porcentagem) / 100);
                            const valor = promocoes.valor_produto * porcentagem;
                            const valorTotal = promocoes.valor_produto - valor;
                            return (
                                <TableRow>
                                    <TableCell>{promocoes.nome_produto}</TableCell>
                                    <TableCell>{promocoes.porcentagem}</TableCell>
                                    <TableCell>{promocoes.valor_produto}</TableCell>
                                    <TableCell>{valorTotal}</TableCell>
                                    <TableCell><Button variant="contained" color="primary">Alterar</Button></TableCell>
                                    <TableCell><Button variant="contained" color="secondary">Revogar</Button></TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </Grid>
        </Grid >
    )
}

export default Promos;