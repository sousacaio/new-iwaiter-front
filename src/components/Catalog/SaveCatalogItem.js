import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Button, MenuItem, Select, Fab, Card, CardActionArea, CardMedia, CardActions,
} from '@material-ui/core';
import '../../pages/Account/Configs.css';
import { saveEstablishmentCatalog } from '../../utils/requisitions/catalog'
import camera from '../../assets/Cam.png';
import { useStyles } from './ItemStyles';
const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: "300px" || "10em",
        paddingTop: '56.25%', // 16:9
    },
};

const SaveCatalogItem = ({ mustReload, parentState }) => {
    const classes = useStyles();
    const [formState, setFormState] = useState(false);
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
        const response = await saveEstablishmentCatalog(itens, selectedFile);
        if (response) {
            closeForm()
            mustReload(!parentState)
        }
    }
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
            <Fab color="primary" onClick={() => openForm()} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
            <Dialog open={formState} onClose={closeForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar produto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após adicionar o produto,ele entrará imediatamente no seu menu
                </DialogContentText>
                    <Card className={classes.root}>
                        <CardActionArea>



                        </CardActionArea>
                    </Card >
                    <Card className={classes.root}>
                        <CardActionArea>
                            <form >
                                <label>
                                    <input type="file" onChange={onSelectFile} />
                                </label>
                            </form>
                            <CardMedia
                                component="img"
                                alt="Foto bar"
                                height="200"
                                image={selectedFile ? preview : camera}
                                style={styles}
                                title="Fto bar"
                            />
                        </CardActionArea>
                        {selectedFile ?
                            <CardActions>
                                <Button size="small" onClick={() => { setSelectedFile(); setPreview() }}>
                                    Escolher outra imagem
                                        </Button>
                            </CardActions>
                            :
                            ""}
                    </Card >
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