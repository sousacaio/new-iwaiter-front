import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Button, MenuItem, Select, Fab
} from '@material-ui/core';
import '../../pages/Configs/Configs.css';
import { saveEstablishmentCatalog } from '../../utils/requisitions/catalog'

const SaveCatalogItem = ({ mustReload, parentState }) => {
    const [formState, setFormState] = useState(false);
    const [itens, setItems] = useState({
        name: '',
        description: '',
        value: '',
        category: '',
    })
    const handleItem = name => event => {
        setItems({ ...itens, [name]: event.target.value });
    };

    function openForm() {
        setFormState(true)
    }
    function closeForm() {
        setFormState(false)
    }
    const addProdCardapio = async () => {
        const response = await saveEstablishmentCatalog(itens);
        if (response) {
            closeForm()
            mustReload(!parentState)
        }
    }

    return (
        <>
            <Fab color="primary" onClick={() => openForm()} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
            <Dialog open={formState} onClose={closeForm} aria-labelledby="form-dialog-title">
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
                    <Button onClick={closeForm} color="primary">
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
export default SaveCatalogItem;