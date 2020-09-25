import React from 'react';
import { Grid, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import { useStyles } from './styles'

import OrdersDialog from '../../components/Orders/OrdersCatalog';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Badge from '@material-ui/core/Badge';

const PointMap = ({data, setShouldUpdate, shouldUpdate,confirmPayment}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {data && data.filter(item=>item.isPaid === false && item.isCanceled === false && item.isClosed ===false).map((item, index) => {

                const confirmedOrdersLength = item.orders.filter((conf)=>conf.confirmed === 1).length;
                const notConfirmedOrdersLength = item.orders.filter((conf)=>conf.confirmed !== 1).length;
                const paymentMethod = item.payment_method;
                const idCustomer = item.customer;
                const idOrder = item._id;
                const somar = (acumulado, x) => acumulado + x;
                const isClosed =  item.isClosed;
                const customerName = item.customer_info[0].name;
                const point = item.point_number;
                const values = item.orders.map((item) => {
                    if (item.confirmed === 1) {
                        return item.value * item.quantity
                    } else {
                        return 0;
                    }
                });

                return (
                    <Grid item lg={4} xs={12} sm={6}                    >
                    <Card className={classes.card} key={index}                        >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Comanda de {customerName}
                            </Typography>
                             <br />
                            <Typography variant="h5" component="h2">
                                Alocado(a) na mesa {point}
                            </Typography>
                             <br />
                            <Grid container spacing="2" direction="column">
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="stretch"
                                >
                                    <Typography variant="body2" component="p">
                                        Itens pedidos:
                                  
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Não atendidos:                               
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Confirmados:
                                    </Typography>
                                </Grid>
                                <br/>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="stretch"
                                >
                                    <Badge badgeContent={item.orders.length} color="primary">
                                        <ShoppingCartIcon style={{ color: 'black'}}/>
                                    </Badge>

                                    <Badge badgeContent={notConfirmedOrdersLength} color="primary" showZero>
                                        <ShoppingCartIcon color="error" />
                                    </Badge>

                                    <Badge badgeContent={confirmedOrdersLength} color="primary" showZero>
                                        <ShoppingCartIcon style={{ color: 'green'}} />
                                    </Badge>
                                </Grid>
                            </Grid>
                            <br/>
                            <br/>
                                                           
                            <Grid container spacing="2" direction="column">
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="stretch"
                                >
                                    <Grid direction="row">
                                       <Typography variant="body2" component="p"   justify="flex-start">
                                            Método de pagamento:                             
                                        </Typography>
                                    </Grid>
                                    <Grid  justify="flex-start">
                                    <Typography variant="body2" component="p" >
                                      {paymentMethod}                             
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="stretch"
                                >
                                    <Grid direction="row">
                                       <Typography variant="body2" component="p"  justify="flex-start">
                                           Valor total da comanda:                           
                                        </Typography>
                                    </Grid>
                                    <Grid  justify="flex-start">
                                    <Typography variant="body2" component="p">
                                      R$ {values.reduce(somar).toFixed(2)}                             
                                    </Typography>
                                </Grid>                            
                                </Grid>                            
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="stretch"
                                >
                                    <Grid direction="row">
                                       <Typography variant="body2" component="p">
                                           Status                         
                                        </Typography>
                                    </Grid>
                                    <Grid  justify="flex-start">
                                    <Typography variant="body2" component="p">
                                     {item.isClosed === true?'Fechada':'Aberta'}                           
                                    </Typography>
                                </Grid>                           
                                </Grid>             
                            </Grid>
                        </CardContent>
                        <CardActions>
                            {!isClosed?                                
                                    <OrdersDialog
                                        id={item._id}  orders={item.orders}
                                        customer={customerName}
                                        value={values.reduce(somar).toFixed(2)} point={item.point}
                                        setShouldUpdate={setShouldUpdate}
                                    />
                            :                              
                            <Button  variant="contained"   color="primary" 
                                 onClick={()=>{    confirmPayment(idOrder,idCustomer);  }}  >
                                 Confirmar pagamento
                                </Button>
                            }                          
                            </CardActions>
                    </Card >
                </Grid>
                )
            })}
        </React.Fragment >
    );
}
export default PointMap