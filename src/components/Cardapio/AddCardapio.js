import React, { useState, useCallback } from 'react';
import { getId } from '../../services/auth'
import api from '../../services/api'
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Button,  MenuItem, Select
} from '@material-ui/core';
import '../../pages/Configs/Configs.css';

const AddCardapio = ({ open, closeForm, fetchData }) => {
    const forceUpdate = useCallback(() => updateState({}), []);
    const [, updateState] = React.useState();

    const [itens, setItems] = useState({
        name: '',
        description: '',
        value: '',
        category: '',
    })
    const handleItem = name => event => {
        setItems({ ...itens, [name]: event.target.value });
    };
    //Esse closeForm é a função que tá vindo do pai do componente
    const handleCloseForm = () => {
        closeForm();
    };
    const addProdCardapio = async () => {
        await api.post(`establishment/${getId()}/catalog`, itens).then((r) => {
            alert(r.data.message);
            handleCloseForm();
            forceUpdate();
            fetchData();
        })

    }

    return (
        <>
            <Dialog open={open} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar produto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após adicionar o produto,ele entrará imediatamente no seu menu
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        id="name"
                        label="Nome do produto"
                        type="text"
                        value={itens.name}
                        onChange={handleItem('name')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        id="description"
                        label="Descrição"
                        type="text"
                        value={itens.description}
                        onChange={handleItem('description')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="value"
                        id="value"
                        label="Valor"
                        type="number"
                        value={itens.value}
                        onChange={handleItem('value')}
                        fullWidth
                    />
                    <Select
                        value={itens.category}
                        onChange={handleItem('category')}
                        autoWidth
                    >
                        <MenuItem value="comidas">Comidas</MenuItem>
                        <MenuItem value="bebidas">Bebidas</MenuItem>
                        <MenuItem value="sobremesas">Sobremesas</MenuItem>
                    </Select>

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