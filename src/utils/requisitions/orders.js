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
    if (changeStatus.data.success === true) {
        success('Pedido confirmado');
        return changeStatus;
    } else {
        warning('Houve um erro ao processar sua requisição');
        return false;
    }
}