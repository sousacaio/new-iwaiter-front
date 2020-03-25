import React, { useEffect, useState } from 'react';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import './Cardapio.css';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Button, Grid, Typography } from '@material-ui/core';
//import { Box } from '@material-ui/core';
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import Camera from '../../assets/Cam.png';
import { Tabs, Tab } from '@material-ui/core';
import { AppBar, Modal, Backdrop, Fade } from '@material-ui/core';
import ItemCardapio from '../../components/ItemCardapio/ItemCardapio';
//https://codepen.io/qq7886/pen/MypEvw
const Cardapio = (props, history) => {
    const [data, setData] = useState([]);
    const [nome,] = useState('');
    //const [nome, setNome] = useState('');
    // const [categoriaFiltro, setCategoriaFiltro] = useState('');
    // const [filtrados, setFiltrados] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleNomeChange = (event) => {
    //     setNome(event.target.value);
    //     filtraCardapioPorNome();
    // }
    // const handleCategoriaChange = (event) => {
    //     setCategoriaFiltro(event.target.value);
    // }

    // function filtraCardapioPorNome() {
    //     let profs = data;
    //     let q = nome;
    //     profs = profs.filter((profs) => {
    //         return profs.nome.toLowerCase().indexOf(q) !== -1;
    //     });
    //     setFiltrados(profs);
    // }
    // function filtraCardapioPorCategoria() {
    //     let profs = data;
    //     let q = categoriaFiltro;
    //     profs = profs.filter((profs) => {
    //         return profs.categoria.toLowerCase().indexOf(q) !== -1;
    //     });
    //     setFiltrados(profs);
    // }

    useEffect(() => {
        function fetchData() {
            api.get('/cardapios', { headers: { id: getIdBar() } })
                .then((r) => {
                    setData(r.data.cardapio);
                    setCategoria(r.data.categorias)
                })
        }
        fetchData()
    }, [nome]);
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }
    const classes = useStyles();
    return (
        <Wrapper>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {categoria.map((cat, index) => (
                            <Tab label={cat} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </AppBar>
                {/* {categoria.map((cat, index) => (
                    <TabPanel value={index} index={index}>
                        {cat}
                    </TabPanel>
                ))} */}
            </div>
            <Grid container spacing={4}>
                {data.map(card => {
                    const caminhoFoto = `http://localhost:3000/files/${card.foto}`;
                    return <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            {card.foto ?
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={caminhoFoto}
                                    title="Image title"
                                /> :
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={Camera}
                                    title="Image title"
                                />
                            }
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.nome}
                                </Typography>
                                <Typography>
                                    {card.descricao}
                                </Typography>
                                <div>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                        disableBackdropClick={false}
                                    >
                                        <Fade in={open}>
                                            <div className={classes.paper}>
                                                <ItemCardapio id={card.id} />
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={handleOpen}>
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>
                })}
            </Grid>
            {/* <Flexrow>
                <div className="cardapio-navbar">
                    <input type="text" align="middle"
                        className="brk-btn"
                        value={nome}
                        placeholder="Pesquise por nome"
                        onChange={(event) => handleNomeChange(event)}
                    />
                    <div>
                        <select value={categoriaFiltro} onChange={handleCategoriaChange} className="brk-btn">
                            <option disabled >Escolha uma das suas categorias </option>
                            {categoria.map((categorias, index) => (
                                <option value={categorias}>{categorias} </option>
                            ))}
                        </select>
                        <div className="brk-btn" onClick={() => filtraCardapioPorCategoria()}>
                            Pesquisar por categoria
                            </div>
                    </div>
                </div>
            </Flexrow>
            <Flexrow>
                <div class="masonry">
                    {filtrados.length > 0 ?
                        filtrados.map((item, index) => {
                            return (
                                <Flexrow key={index} className="item"  >
                                    <CardCardapio
                                        foto={item.foto}
                                        descricao={item.descricao}
                                        nome={item.nome}
                                        valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        categoria={item.categoria} />
                                    <div id={`popup${item.id}`} className="overlay">
                                        <div className="popup">
                                            <a className="close" href="#" >&times;</a>
                                            <div className="content">
                                                <ItemCardapio id={item.id} />
                                            </div>
                                        </div>
                                    </div>
                                    <a href={`#popup${item.id}`} >
                                        Editar
                                        </a>
                                </Flexrow>
                            )
                        })
                        :
                        data.map((item, index) => {
                            return (
                                <Flexrow key={index} className="item"  >

                                    <CardCardapio
                                        foto={item.foto}
                                        descricao={item.descricao}
                                        nome={item.nome}
                                        valor={Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        categoria={item.categoria} />
                                    <div id={`popup${item.id}`} className="overlay">
                                        <div className="popup">
                                            <a className="close" href="#" >&times;</a>
                                            <div className="content">
                                                <ItemCardapio id={item.id} />
                                            </div>
                                        </div>
                                    </div>
                                    <a href={`#popup${item.id}`} >
                                        Editar
                                            </a>
                                </Flexrow>
                            )
                        })}
                </div>
            </Flexrow>*/}
        </Wrapper >
    );
};
// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <Typography
//             component="div"
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-auto-tabpanel-${index}`}
//             aria-labelledby={`scrollable-auto-tab-${index}`}
//             {...other}
//         >
//             {value === index && <Box p={3}>{children}</Box>}
//         </Typography>
//     );
// }
export default Cardapio;
