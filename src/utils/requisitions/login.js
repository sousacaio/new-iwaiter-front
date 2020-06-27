import api from '../../services/api';
import { warning, failure } from '../toasts/toasts';

export const doLogin = async (email, password) => {
    try {
        if (!email || !password) {
            warning('Preencha todos os campos!')
            return false;
        } else {
            const response = await api.post('/establishment/auth', { email, password });
            if (response) {
                const { data: { data: { establishment, token } } } = response;
                const { settings, catalog, address, _id } = establishment;
                return {
                    settings, catalog, address, token, _id, establishment, authorized: true
                }
            } else {
                failure('Houve um problema com suas credenciais');
            }
        }
    } catch (error) {
        failure('Houve um problema com suas credenciais');
    }

}