import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getIdBar, getToken } from '../../services/auth'
import api from '../../services/api'
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid, Fab, TextField } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import camera from '../../assets/camera.svg';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import '../Configs/Configs.css';

const useStyles = makeStyles((theme) => ({

    rootCard: {
        maxWidth: 345,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Cardapio = (props, history) => {
    const classes = useStyles();
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
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
                        handleClose();
                        //traz os dados do banco
                        fetchData()
                        //força o reload do componente
                        forceUpdate();
                    } else {
                        setErrors(r.data.errors);
                        setOpenAlert(true)
                    }
                })
        } else {
            alert('É necessária uma foto pro seu produto!');
        }
    }
    const [data, setData] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [open, setOpen] = React.useState(false);

    async function fetchData() {
        const response = await api.get('/cardapios', { headers: { id: getIdBar(), token: getToken() } });
        setData(response.data.cardapio);
    }
    function SearchFilterFunction(text) {
        //se n tiver texto,traz os dados dnv
        if (!text) {
            fetchData();
        }
        const newData = data.filter(function (item) {
            const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    }
    function SearchFilterByCategory(cat) {
        if (cat === null) {
            fetchData()
        } else {
            doFilter(cat)
        }
    }
    function doFilter(cat) {
        const newData = data.filter(function (item) {
            const itemData = item.categoria ? item.categoria.toUpperCase() : ''.toUpperCase();
            const textData = cat.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <Wrapper>

            <Grid container spacing={4}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {!categoria ?
                                <>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('comidas'); SearchFilterByCategory('comidas'); }}
                                    >
                                        Comidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('bebidas'); SearchFilterByCategory('bebidas') }}>
                                        Bebidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('sobremesas'); SearchFilterByCategory('sobremesas') }}
                                    >
                                        Sobremesas
                                     </Typography>
                                </>
                                :
                                <Typography className={classes.title} variant="h6" noWrap
                                    onClick={() => { SearchFilterByCategory(null); setCategoria(null) }}
                                >

                                    <RefreshIcon fontSize="large" style={{ margin: 10 }} />

                                </Typography>
                            }
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    onChange={e => SearchFilterFunction(e.target.value)}
                                    placeholder="Pesquisa..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Toolbar>

                    </AppBar>
                </div>
            </Grid>
            <br />
            <br />
            <Grid container>
                {data.map((item, index) => {
                    var foto = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/files/${item.foto}`;
                    return (
                        <Grid item lg={4} xs={12} sm={6}>
                            <div key={index}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        {item.foto ? <CardMedia
                                            component="img"
                                            alt="Foto do produto"
                                            height="140"
                                            image={foto}
                                            title="Foto do produto"
                                        /> : <CardMedia
                                                component="img"
                                                alt="Foto do produto"
                                                height="140"
                                                image={camera}
                                                title="Foto do produto"
                                            />}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.nome}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.descricao}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => alert(item.id)}>
                                            Editar
                                            </Button>
                                        <Button size="small" color="primary">
                                            {item.categoria}
                                        </Button>
                                        <Button size="small" color="primary">
                                            R${item.valor}
                                        </Button>
                                        <Button size="small" color="primary">
                                            Promoções ativas
                                            </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
            <Fab color="primary" onClick={handleClickOpen} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                                    {mensagens.message}
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
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                     </Button>
                    <Button onClick={addProdCardapio} color="primary">
                        Adicionar novo produto
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper >
    );
};

export default Cardapio;
