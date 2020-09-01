import api from '../../services/api';
import { getId } from '../../services/auth';
import { warning, failure, success } from '../toasts/toasts';

export const getOrders = async () => {
    const data = await api.post(`orders/id_establishment`, {
        id_establishment: getId()
    });
    const { data: { success } } = data;
    if (success) {
        console.log(data.data)
        return data.data;
    } else {
        failure('Houve um problema ao trazer seus pedidos');
        return false;
    }
}

export const changeRequestStatus = async (OrderId, nestedOrderId, value) => {
    const changeStatus = await api.post(`orders/${OrderId}/changeOrderStatus/${nestedOrderId}/${value}`);

    const { data: { status, message, response: { data } } } = changeStatus;
    if (status === 200) {
        success(message);
        return data;
    } else {
        warning(message);
        return [];
    }
}
export const confirmPaymentByEstablishment = async (idOrder, idCustomer) => {
    try {
        const res = await api.post(`orders/confirmPayment/${idOrder}/${getId()}/${idCustomer}`);
        const { data: { status, message } } = res;
        if (status === 200) {
            success(message)
        } else {
            failure(message)
        }
    } catch (error) {
        failure(error)
    }

}