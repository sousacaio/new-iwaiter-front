import api from '../../services/api';
import { getId } from '../../services/auth';
import { warning, failure, success } from '../toasts/toasts';

export const getSettings = async () => {
    try {
        
        const res = await api.get(`establishment/${getId()}/settings`)
        const { data: { response, status } } = res;
        if (status === 200) {
            const { data } = response;
            return data[0];
        } else {
            failure('Houve um erro ao buscar suas configurações')
        }
    } catch (error) {
        failure('Houve um erro ao buscar suas configurações')
    }
}
export const saveConfsSettings = async (data, workingDays) => {
    try {
        const res = await api.put(`establishment/${getId()}/settings`, {
            location: data.location,
            couvert: data.couvert,
            gorjeta: data.gorjeta,
            embalagem: data.embalagem,
            openingHours: data.openingHours,
            workingDays,
            closingTime: data.closingTime
        });
        const { data: { message, status } } = res;
        if (status === 200) {
            success(message);
            return true
        } else {
            warning(message)
            return false;
        }
    } catch (error) {
        failure('Houve um erro ao atualizar suas configurações')
    }
}

export const saveCouvertSettings = async (couvertSettings) => {
    try {
        const res = await api.put(`establishment/${getId()}/settings`, couvertSettings);
        const { data: { message, status } } = res;
        if (status === 200) {
            success(message);
            return true
        } else {
            warning(message)
            return false;
        }
    } catch (error) {
        failure('Houve um erro ao atualizar suas configurações')
    }
}

export const saveAddress = async (addressSettings) => {
    try {
        const res = await api.post(`establishment/${getId()}/address`, addressSettings);
        const { data: { message, status } } = res;
        if (status === 200) {
            success(message);
            return true
        } else {
            warning(message)
            return false;
        }
    } catch (error) {
        failure('Houve um erro ao atualizar suas configurações')
    }
}
