import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Wrapper from '../../components/Material-ui/Wrapper';
import { connect, useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../../utils/requisitions/orders';
import { storeOrders } from '../../actions/main-actions';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import DetailOrdersModal from './DetailOrdersModal';
import { red } from '@material-ui/core/colors';
import moment from "moment";
import "moment/locale/pt-br";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    rootCard: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
}));
const History = () => {
    const dispatch = useDispatch()
    const storeActiveOrders = (orders) => {
        dispatch(storeOrders(orders))
    }
    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    async function getData() {
        const data = await getOrders();
        const { success, data: newData } = data;
        if (success) {
            storeActiveOrders(newData)
            setData(newData.reverse())
        }
    }
    useEffect(() => {
        getData();
    }, [])
    //const orders = useSelector(state => state.ordersReducer.orders)
    const paidOrders = data.filter(item => item.isPaid === true && item.isCanceled === false)
    const canceledOrders = data.filter(item => item.isCanceled === true)
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Wrapper>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                        <Tab
                            value="one"
                            label="Comandas fechadas e pagas"
                            wrapped
                            {...a11yProps('one')}
                        />
                        <Tab value="two" label="Comandas canceladas" {...a11yProps('two')} />
                        <Tab value="three" label="Comandas canceladas" {...a11yProps('tres')} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index="one">
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="stretch"

                    >


                        {paidOrders.map((item, index) => {

                            const somar = (acumulado, x) => acumulado + x;
                            const valores = item.orders.map((item) => {
                                if (item.confirmed === 1) {
                                    return item.value * item.quantity;
                                } else {
                                    return 0;
                                }
                            });

                            return (
                                <Grid key={index} item xs={5}  >
                                    <Card >
                                        <CardActionArea>
                                            <CardContent>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" className={classes.avatar}>

                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={`Comanda de ${item.customer_info[0].name}`}
                                                    subheader={`Fechada ${moment(item.createdAt).fromNow()}`}
                                                />
                                                <Grid xs style={{ margin: 10 }}>
                                                    <Typography>
                                                        Criada em: {moment(item.createdAt).format('DD/MM/YYYY, h:mm:ss')}
                                                    </Typography>
                                                    <Typography>
                                                        Número de itens pedidos: {item.orders.length}
                                                    </Typography>

                                                    <Typography>
                                                        Valor total da comanda: R$ {valores.reduce(somar).toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <br />
                                                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <Typography className={classes.heading}>Listar pedidos da comanda</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            flexWrap: 'wrap',
                                                            margin: 10,

                                                        }}>

                                                            {item.orders.map((order, index) => {
                                                                let orderStat = '';
                                                                switch (order.confirmed) {
                                                                    case 0:
                                                                        orderStat = "Não atendido";
                                                                        break;
                                                                    case 1:
                                                                        orderStat = "Confirmado";
                                                                        break;
                                                                    case 2:
                                                                        orderStat = "negado";
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                return (
                                                                    <>

                                                                        <Grid item xs={6} >
                                                                            <Typography >
                                                                                {order.name}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography>
                                                                                {order.value}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography>
                                                                                {orderStat}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography>
                                                                                {order.quantity}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index="two">
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="stretch"

                    >
                        {canceledOrders.map((item, index) => {

                            const somar = (acumulado, x) => acumulado + x;
                            const valores = item.orders.map((item) => {
                                if (item.confirmed === 1) {
                                    return item.value * item.quantity;
                                } else {
                                    return 0;
                                }
                            });
                            return (
                                <Grid key={index} item xs={5}  >
                                    <Card >
                                        <CardActionArea>
                                            <CardContent>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" className={classes.avatar}>

                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={`Comanda de ${item.customer_info[0].name}`}
                                                    subheader={`Fechada ${moment(item.createdAt).fromNow()}`}
                                                />
                                                <Typography>
                                                    Criada em: {moment(item.createdAt).format('DD/MM/YYYY, h:mm:ss')}
                                                </Typography>
                                                <Typography>
                                                    Número de itens pedidos: {item.orders.length}
                                                </Typography>
                                                <Typography>
                                                    Número de itens confirmados: 0
                                            </Typography>
                                                <Typography>
                                                    Número de itens negados: 0
                                            </Typography>
                                                <Typography>
                                                    Número de itens em espera: 0
                                            </Typography>
                                                <Typography>
                                                    Valor total da comanda: R$ {valores.reduce(somar).toFixed(2)}
                                                </Typography>
                                                <Typography>
                                                    {JSON.stringify(item.orders, null, '\t')}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>

                                            <DetailOrdersModal
                                                total={valores.reduce(somar).toFixed(2)}
                                                data={item.orders}
                                                open={openModal}
                                                setOpen={setOpenModal}
                                            />
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index="three">
                    Item Three
                </TabPanel>
            </div >
        </Wrapper >
    );
}

export default connect(null, null)(History);