import api from '../../services/api';
import { getId } from '../../services/auth';
import { warning, failure, success } from '../toasts/toasts';

export const getSettings = async () => {
    try {
        const response = await api.get(`establishment/${getId()}/settings`)
        const { data: { data } } = response;
        if (data) {
            return data[0].settings;
        } else {
            warning('Houve um erro ao buscar suas configurações')
        }
    } catch (error) {
        failure('Houve um erro ao buscar suas configurações')
    }
}
export const saveCouvertSettings = async (couvertSettings) => {
    try {
        const response = await api.put(`establishment/${getId()}/settings`, couvertSettings);
        if (response) {
            success('Couvert atualizado');
            return true
        } else {
            warning('Houve um erro ao atualizar suas configurações')
            return false;
        }
    } catch (error) {
        failure('Houve um erro ao atualizar suas configurações')
    }
}