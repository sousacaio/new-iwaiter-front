import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Divider, InputLabel, MenuItem, FormHelperText, FormControl, Select, Table, TableBody, TableCell,
    TableHead, TableRow, TextField, Button, Snackbar, InputAdornment
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../../services/api';
import { getIdBar } from '../../../services/auth';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

const Promos = () => {
    const [aplicavel, setAplicavel] = React.useState(0);
    const [categoria, setCategoria] = React.useState('');
    const [porcentagem, setPorcentagem] = React.useState(0);
    const forceUpdate = useCallback(() => updateState({}), []);
    const [, updateState] = React.useState();
    const [promos, setPromos] = useState([]);
    const [cardapios, setCardapios] = useState([]);
    const [cat, setCat] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [mensagem, setMensagem] = React.useState('')
    const [openDialog, setOpenDialog] = React.useState(false);
    const [idPraMudar, setId] = React.useState('');

    const handleClickOpenDialog = (id) => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    async function revogaDesconto(id) {
        handleClickOpenDialog();
        setId(id)
    }
    const confirmaRevogacao = () => {
        handleCloseDialog();
        api.put('/bar/revogaPromo', { id: idPraMudar },
            { headers: { id_bar: getIdBar() } }).then((r) => {
                if (r.status === 200) {
                    forceUpdate();
                    handleClick();
                    setSeverity('success');
                    setMensagem('Desconto revogado com sucesso!');
                } else {
                    forceUpdate();
                    handleClick();
                    setSeverity('error');
                    setMensagem('Desconto revogado com sucesso!');
                }
            });
    }
    const handleChangeAplicavel = event => {
        setAplicavel(event.target.value);
        setCategoria(null);
    };
    const handleChangeCategoria = event => {
        setCategoria(event.target.value)
        setAplicavel(null);
    }
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const salvarNovoDesconto = async () => {
        await api.post('/bar/promo', { aplicavel, porcentagem, categoria },
            { headers: { id_bar: getIdBar() } })
            .then((r) => {
                console.log(r)
                if (r.data.status === 'created') {
                    forceUpdate();
                    handleClick();
                    setSeverity('success');
                    setMensagem('Desconto criado com sucesso!');
                }
                if (r.data.status === 'descontoExistente') {
                    handleClick();
                    setSeverity('info');
                    setMensagem('O produto selecionado já possui um desconto vinculado');
                }
                if (r.data.status === 'descExiste') {
                    handleClick();
                    setSeverity('info');
                    setMensagem('Toda a categoria já tem desconto vinculado!');
                }
            });
    }

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
        getCardapios();
        getPromos();
        if (open === true) {
            forceUpdate();
        }
    }, [open, forceUpdate]);
    const classes = useStyles()
    return (
        <Grid container spacing={12}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {mensagem}
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Tem certeza que deseja revogar o desconto desse produto?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A partir do momento que você concordar,o preço anterior dele será restaurado
                        e o preço do desconto será revogado.
                 </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Não,não quero fazer isso
                </Button>
                    <Button onClick={confirmaRevogacao} color="primary" autoFocus>
                        Sim,eu quero fazer isso
                     </Button>
                </DialogActions>
            </Dialog>
            <Grid container xs={12}>
                <Grid xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Produto</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={aplicavel}
                            onChange={handleChangeAplicavel}
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
                            value={categoria}
                            onChange={handleChangeCategoria}
                        >
                            {cat.map((item, ids) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Escolha a categoria que você deseja dar desconto!</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <FormControl className={classes.formControl}>
                        <TextField id="Valor" label="Porcentagem"
                            onChange={e => setPorcentagem(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                         
                            helperText="A quantia que você quer aplicar de desconto sobre o produto" />
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <Button variant="contained"
                        onClick={salvarNovoDesconto}
                        className={classes.btn} color="primary">Habilitar desconto</Button>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promos.map((promocoes, id) => {
                            return (
                                <TableRow>
                                    <TableCell>{promocoes.nome_produto}</TableCell>
                                    <TableCell>{promocoes.porcentagem}</TableCell>
                                    <TableCell>{promocoes.valor_ant}</TableCell>
                                    <TableCell>{promocoes.valor_produto}</TableCell>
                                    <TableCell><Button variant="contained" onClick={() => revogaDesconto(promocoes.id)} color="secondary">Revogar desconto</Button></TableCell>
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