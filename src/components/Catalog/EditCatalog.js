import React, { useState, useEffect } from 'react';
import { useStyles } from './ItemStyles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText
    , TextField, Button,
    InputLabel, MenuItem, Select, Slide, Grid,
    Card, CardActionArea, CardMedia, CardActions,
    AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../../pages/Account/Configs.css';
import { updateEstablishmentCatalog } from '../../utils/requisitions/catalog';
import camera from '../../assets/Cam.png';
import CloseIcon from '@material-ui/icons/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: "300px" || "10em",
        paddingTop: '56.25%', // 16:9
    },
};
const useStyles2 = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const EditCatalog = ({ id, name, value, category, photo, description, mustReload, parentState }) => {
    const classes = useStyles();
    const classes2 = useStyles2();
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
            <Dialog fullScreen open={open} onClose={() => { handleClose(); }} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
                <AppBar className={classes2.appBar}>
                    <Toolbar>

                        <Typography variant="h6" className={classes2.title}>
                            Edição de produto do catálogo
                        </Typography>

                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container spacing="2" direction="row">
                        <Grid item lg={6} md={8} sm={12} xs={12} spacing={2} direction="column" >
                            <Card className={classes.root}>
                                <CardActionArea>
                                    {photo ?
                                        <CardMedia
                                            component="img"
                                            alt="Foto bar"
                                            height="200"
                                            style={styles}
                                            image={`http://${process.env.REACT_APP_NOT_SECRET_CODE}/${photo}`}
                                            title="Foto bar"
                                        />
                                        :
                                        <CardMedia
                                            component="img"
                                            alt="Foto bar"
                                            height="200"
                                            image={camera}
                                            style={styles}
                                            title="Foto bar"
                                        />
                                    }
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
                        </Grid>
                        <Grid item lg={6} md={8} sm={12} xs={12} >
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
                        </Grid>
                    </Grid>
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