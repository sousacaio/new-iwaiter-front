import api from '../../services/api';
import { getId } from '../../services/auth';
import { warning, failure, success } from '../toasts/toasts';

export const getOrders = async () => {
    const data = await api.post(`orders/id_establishment`, {
        id_establishment: getId()
    });
    const { data: { success } } = data;
    if (success) {
        console.log('data')
        console.log(data.data)
        return data.data;
    } else {
        
        failure('Houve um problema ao trazer seus pedidos');
        return false;
    }
}
const checkOrderStatus = async (orderId) => {
    try {
        const res = await api.get(`orders/getById/${orderId}`);
        const { data: { status, response: { data: { isCanceled } } } } = res;
        if (status === 200) {
            if (isCanceled) {
                warning('Essa comanda foi cancelada pelo usuário')
                return true;
            }
        } else {
            failure('Não foi possível trazer os dados da comanda para poder validar a operação')
            return false
        }
    } catch (error) {
        failure(error)
    }

}
export const changeRequestStatus = async (OrderId, nestedOrderId, value) => {
    if (!await checkOrderStatus(OrderId)) {
        const changeStatus = await api.post(`orders/${OrderId}/changeOrderStatus/${nestedOrderId}/${value}`);
        const { data: { status, message, response } } = changeStatus;
        if (status === 200) {
            success(message);
            return response;
        } else {
            warning(message);
            return await getOrders();
        }
    } else {
        return await getOrders()
    }
}
export const confirmPaymentByEstablishment = async (idOrder, idCustomer) => {
    try {
        if (!await checkOrderStatus(idOrder)) {
            const res = await api.post(`orders/confirmPayment/${idOrder}/${getId()}/${idCustomer}`);
            const { data: { status, message } } = res;
            if (status === 200) {
                success(message)
            } else {
                failure(message)
            }
        }
    } catch (error) {
        failure(error)
    }

}