import api from '../../services/api';
import { failure, success } from '../toasts/toasts';
import { doLogin } from './login'
export const doSignUp = async (data) => {
    try {
        const res = await api.post('establishment', data);
        const { data: { response, status } } = res;
        const { message } = response;
        console.log(response)
        if (status === 201) {
            success(message)
            const { data: { email, password } } = response;
            const login = await doLogin(email, password);
            return login;
        } else {
            failure(message)
        }

    } catch (error) {
        failure(error)
    }
}