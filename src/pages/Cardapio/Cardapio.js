import React, { useEffect, useState } from 'react';
import { getIdBar, getToken } from '../../services/auth'
import api from '../../services/api'
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../components/Material-ui/Wrapper';
import {
    Grid, Fab, AppBar, Toolbar, Typography, InputBase, Card,
    CardActionArea, CardActions, CardContent, CardMedia, Button
} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import '../Configs/Configs.css';
import AddCardapio from '../../components/Cardapio/AddCardapio';
import ItemCardapio from '../../components/Cardapio/ItemCardapio';
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
    const [data, setData] = useState([]);
    const [idUpdateForm, setIdUpdateForm] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [formState, setFormState] = useState(false);
    async function fetchData() {
        const response = await api.get('/cardapios', { headers: { id: getIdBar(), token: getToken() } });
        setData(response.data.data);
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
    function openForm() {
        setFormState(true)
    }
    function closeForm() {
        setFormState(false)
    }
    function openUpdateForm(id) {
        setIdUpdateForm(id)
    }
    async function clean() {
        const val = 0;
        setIdUpdateForm(val);
    }

    useEffect(() => {
        fetchData()
    }, [idUpdateForm]);
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
                                                image="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                                                title="Foto do produto"
                                            />}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.nome}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.descricao}...
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => openUpdateForm(item.id)}>
                                            Editar
                                            <ItemCardapio
                                                id={item.id}
                                                nome={item.nome}
                                                categoria={item.categoria}
                                                descricao={item.descricao}
                                                valor={item.valor}
                                                foto={item.foto}
                                                idItem={idUpdateForm}
                                                fetchData={fetchData}
                                                clean={clean}
                                            />
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
            <Fab color="primary" onClick={() => openForm()} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
            <AddCardapio closeForm={closeForm} open={formState} fetchData={fetchData} />
        </Wrapper >
    );
};

export default Cardapio;
