import React, { useState, useMemo, useCallback } from 'react';
import { getIdBar, getToken } from '../../services/auth'
import api from '../../services/api'
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, Collapse, TextField, Button, Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import camera from '../../assets/camera.svg'
import '../../pages/Configs/Configs.css';

const AddCardapio = ({ open, closeForm, fetchData }) => {
    const forceUpdate = useCallback(() => updateState({}), []);
    const [, updateState] = React.useState();
    const [thumbnail, setThumbnail] = useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [errors, setErrors] = useState([]);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    const [itens, setItems] = useState({
        id_bar: getIdBar(),
        nome: '',
        descricao: '',
        valor: '',
        categoria: '',
    })
    const handleItem = name => event => {
        setItems({ ...itens, [name]: event.target.value });
    };
    //Esse closeForm é a função que tá vindo do pai do componente
    const handleCloseForm = () => {
        closeForm();
    };
    const addProdCardapio = async () => {
        if (thumbnail) {
            const form = new FormData();
            form.append('thumbnail', thumbnail);
            form.append('nome', itens.nome);
            form.append('descricao', itens.descricao);
            form.append('valor', itens.valor);
            form.append('categoria', itens.categoria);
            await api.post('/cardapio', form,
                { headers: { id_bar: getIdBar(), token: getToken() } }).then((r) => {
                    if (!r.data.errors) {
                        alert('Produto criado!');
                        //nao mostra error
                        setErrors([]);
                        //fecha o modal
                        handleCloseForm();
                        //força o reload do componente
                        forceUpdate();
                        //
                        fetchData();
                    } else {
                        //rola a página pra cima caso tenha algum erro                     
                        setErrors(r.data.errors);
                        setOpenAlert(true)
                    }
                })
        } else {
            alert('É necessária uma foto pro seu produto!');
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar produto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após adicionar o produto,ele entrará imediatamente no seu menu
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
                        value={itens.nome}
                        onChange={handleItem('nome')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="descricao"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        value={itens.descricao}
                        onChange={handleItem('descricao')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="valor"
                        id="valor"
                        label="Valor"
                        type="number"
                        value={itens.valor}
                        onChange={handleItem('valor')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="categoria"
                        id="categoria"
                        label="Categoria"
                        type="number"
                        value={itens.categoria}
                        onChange={handleItem('categoria')}
                        fullWidth
                    />
                    <br />
                    <Typography>Foto do produto:</Typography>
                    <br />
                    <label
                        id="thumbnail"
                        style={{ backgroundImage: `url(${preview})` }}
                        className={thumbnail ? 'has-thumbnail' : ''}
                    >
                        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                        <img src={camera} alt="Select img" />
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm} color="primary">
                        Cancelar
             </Button>
                    <Button onClick={addProdCardapio} color="primary">
                        Adicionar novo produto
            </Button>

                </DialogActions>
            </Dialog>
        </>
    )

}
export default AddCardapio;