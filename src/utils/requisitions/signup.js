import api from '../../services/api';
import { failure, success } from '../toasts/toasts';
import { doLogin } from './login'
export const doSignUp = async (data) => {
    try {
        const res = await api.post('auth/establishments/create', data);
        const { data: { response, status, errors } } = res;
        const { message } = response;
        console.log(res)
        if (status === 201) {
            success(message)
            const { data: { email, password } } = response;
            const login = await doLogin(email, password);
            return login;
        } else {
            if (message) {
                failure(message)
                return { authorized: false }
            } else {
                if (errors) {
                    failure(errors.messsage)
                    return { authorized: false }
                }
            }
        }
    } catch (error) {
        failure(error)
    }
}