import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid } from '@material-ui/core'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../utils/requisitions/orders';
import { storeOrders } from '../../actions/main-actions';

import api from '../../services/api';
import { getId } from '../../services/auth';
import PointMap from './PointMap';

const Main = () => {
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const confirmPayment = async (idOrder, idCustomer) => {
        const response = await api.post(`orders/confirmPayment/${idOrder}/${getId()}/${idCustomer}`);
        console.log(response)
    }

    const orders = useSelector(state => state.ordersReducer.orders)
    const dispatch = useDispatch()
    const storeActiveOrders = (orders) => {
        dispatch(storeOrders(orders))
    }
    async function getData() {
        const data = await getOrders();
        storeActiveOrders(data)
    }
    useEffect(() => {
        getData();
        setTimeout(() => {
            setShouldUpdate(!shouldUpdate)
        }, 5000)
    }, [shouldUpdate])

    return (
        <Wrapper>
            <Grid
                container
                spacing="3"
            >
                <PointMap
                    data={orders}
                    setShouldUpdate={setShouldUpdate}
                    confirmPayment={confirmPayment}
                />
            </Grid>
        </Wrapper>

    );
}


export default connect()(Main);