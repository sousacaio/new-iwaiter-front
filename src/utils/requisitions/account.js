import api from '../../services/api';
import { getId } from '../../services/auth';
import { success, warning, failure } from '../toasts/toasts';

export const fetchEstablishmentAccountData = async () => {
    const response = await api.get(`establishment/${getId()}/account`);

    const { data: { data } } = response;
    if (data) {
        return data;
    } else {
        failure('Não foi possível trazer suas configurações de conta')
    }
}

export const updateEstablishmentAccount = async (file, account) => {
    try {
        if (!account.name || !account.email || !account.phone) {
            warning('Preencha todos os campos!')
        } else {
            const data = new FormData();
            data.append('name', account.name)
            data.append('email', account.email)
            data.append('phone', account.phone)
            data.append('image', file)
            const response = await api.put(`establishment/${getId()}/account`, data)
            const { data: { errors, message } } = response;
            if (!errors) {
                success(message);
                return true;
            } else {
                failure(message);
                return false;
            }
        }
    } catch (error) {
        console.log(error)
        failure('Houve um erro ao atualizar sua conta');
    }
}
