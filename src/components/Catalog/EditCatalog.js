import React, { useState, useEffect } from 'react';
import { useStyles } from './ItemStyles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    IconButton, TextField, Button, GridList, GridListTile, GridListTileBar,
    InputLabel, MenuItem, Select
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import '../../pages/Account/Configs.css';
import { updateEstablishmentCatalog } from '../../utils/requisitions/catalog';
import camera from '../../assets/Cam.png';
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
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const update = async () => {
        const response = await updateEstablishmentCatalog(data, id, selectedFile);
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

    var pic = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/${photo}`
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Editar
            </Button>
            <Dialog open={open} onClose={() => { handleClose(); }} aria-labelledby="form-dialog-title">
                <form >
                    <label id="thumbnail">
                        <input type="file" onChange={onSelectFile} />
                        {selectedFile ? <img src={preview} alt="Select img" />
                            : <img src={camera} alt="Select img" />}
                    </label>
                </form>
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
                            {/* {selectedFile ? <img src={preview} alt="Select img" />
                                : <img src={camera} alt="Select img" />} */}
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