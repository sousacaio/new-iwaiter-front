import React, { useState } from 'react';
import { useStyles } from './ItemStyles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    IconButton, TextField, Button, GridList, GridListTile, GridListTileBar,
    InputLabel, MenuItem, Select
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import '../../pages/Configs/Configs.css';
import { updateEstablishmentCatalog } from '../../utils/requisitions/catalog';

const EditCatalog = ({ id, name, value, category, photo, description, mustReload, parentState }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        name: name,
        category: category,
        value: value,
        photo: photo,
        description: description
    });
    const update = async () => {
        const response = await updateEstablishmentCatalog(data, id);
        if (response) {
            setOpen(false)
            mustReload(!parentState)
        }
    }
    const handleItem = name => event => {
        setData({ ...data, [name]: event.target.value });
    };
    async function handleClose() {
        await setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    var pic = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/files/${photo}`
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Editar
            </Button>
            <Dialog open={open} onClose={() => { handleClose(); }} aria-labelledby="form-dialog-title">

                {photo ?
                    <GridList cellHeight={300} spacing={5} className={classes.gridList}>
                        <GridListTile cols={2} rows={1}>
                            <img src={pic} alt={name} />
                            <GridListTileBar
                                title={name}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${name}`} className={classes.icon}>
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
                            <img src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt={name} />
                            <GridListTileBar
                                title={name}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${name}`} className={classes.icon}>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        id="name"
                        label="name do produto"
                        type="text"
                        value={data.name}
                        onChange={handleItem('name')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        id="description"
                        label="Descrição"
                        type="text"
                        value={data.description}
                        onChange={handleItem('description')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="value"
                        id="value"
                        label="value"
                        type="number"
                        value={data.value}
                        onChange={handleItem('value')}
                        fullWidth
                    />
                    <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                    <Select
                        value={data.category}
                        onChange={handleItem('category')}
                        autoWidth
                    >
                        <MenuItem value="comidas">Comidas</MenuItem>
                        <MenuItem value="bebidas">Bebidas</MenuItem>
                        <MenuItem value="sobremesas">Sobremesas</MenuItem>
                    </Select>

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
export default EditCatalog;