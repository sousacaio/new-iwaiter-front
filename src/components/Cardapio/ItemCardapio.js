import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/auth'
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    IconButton, Collapse, TextField, Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import '../../pages/Configs/Configs.css';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 'auto',
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));
const ItemCardapio = ({ clean, id, nome, valor, categoria, foto, idItem ,descricao}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        id: id,
        nome: nome,
        categoria: categoria,
        valor: valor,
        foto: foto,
        descricao:descricao
    });
    const [openAlert, setOpenAlert] = React.useState(false);
    const [errors, setErrors] = useState([]);
    const update = async () => {
        const form = new FormData();
        if (data.nome && data.descricao && data.valor && data.categoria) {
            form.append('nome', data.nome);
            form.append('descricao', data.descricao);
            form.append('valor', data.valor);
            form.append('categoria', data.categoria);
            await api.put('/cardapio', form,
                { headers: { id: id, token: getToken() } }).then((r) => {
                    console.log(r)
                    if (!r.data.errors) {
                        alert(r.data.message);
                        //nao mostra error
                        setErrors([]);
                        //fecha o modal
                        handleClose();
                    } else {
                        //rola a página pra cima caso tenha algum erro                     
                        setErrors(r.data.errors);
                        setOpenAlert(true)
                    }
                })
        }else{
            alert('Preencha todos os dados do seu produto!');
        }
    }
    const handleItem = name => event => {
        setData({ ...data, [name]: event.target.value });
    };
    async function handleClose() {
        await setOpen(false);
        await clean()
    }
    var pic = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/files/${foto}`
    //Se o idItem for igual ao id selecionado no componente pai,o modal é aberto
    useEffect(() => {
        if (idItem === id) { setOpen(true) }
    }, [id, idItem]);
    return (
        <>
            <Dialog open={open} onClose={() => { handleClose(); }} aria-labelledby="form-dialog-title">

                {foto ?
                    <GridList cellHeight={300} spacing={5} className={classes.gridList}>
                        <GridListTile cols={2} rows={1}>
                            <img src={pic} alt={nome} />
                            <GridListTileBar
                                title={nome}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${nome}`} className={classes.icon}>
                                        <StarBorderIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                        </GridListTile>
                    </GridList>
                    :
                    <GridList cellHeight={300} spacing={5} className={classes.gridList}>
                        <GridListTile cols={2} rows={1}>
                            <img src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt={nome} />
                            <GridListTileBar
                                title={nome}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${nome}`} className={classes.icon}>
                                        <StarBorderIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                        </GridListTile>
                    </GridList>}
                <DialogContent>
                    <DialogContentText>
                        As alterações entrarão imediatamente no seu menu
                    </DialogContentText>
                    <Collapse in={openAlert}>
                        {errors.map((mensagens, i) => {
                            return <>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => { setOpenAlert(false); }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {mensagens}
                                </Alert>
                            </>
                        })}
                    </Collapse>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="nome"
                        id="nome"
                        label="Nome do produto"
                        type="text"
                        value={data.nome}
                        onChange={handleItem('nome')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="descricao"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        value={data.descricao}
                        onChange={handleItem('descricao')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="valor"
                        id="valor"
                        label="Valor"
                        type="number"
                        value={data.valor}
                        onChange={handleItem('valor')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="categoria"
                        id="categoria"
                        label="Categoria"
                        type="number"
                        value={data.categoria}
                        onChange={handleItem('categoria')}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); }} color="primary">
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={update}>
                        Alterar produto
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
export default ItemCardapio;