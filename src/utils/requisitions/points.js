import api from '../../services/api';
import { getId } from '../../services/auth';
import { warning, failure, success } from '../toasts/toasts';
export const deleteUniquePoint = async (idPoint) => {
    try {
        const points = await api.post(`establishment/${getId()}/delete/${idPoint}`);
        const { data } = points
        const desambiguation = data.success;
        if (desambiguation) {
            success('Ponto deletado com sucesso')
            return true;
        } else {
            failure('Houve um problema ao deletar seu ponto');
        }
    } catch (error) {
        console.log(error)
        failure('Houve um problema ao deletar seu ponto');
    }

}

export const checkAndBringPoints = async () => {
    try {
        const points = await api.get(`establishment/${getId()}/points`);
        const { data: { data } } = points;
        console.log(data)
        if (data) {
            return data
        } else {
            failure('Ops,houve um problema ao trazer seus pontos')
        }
    } catch (error) {
        failure('Ops,houve um problema ao trazer seus pontos')
    }

}

export const createNewPoint = async (points, newPoint) => {
    try {
        const isRepeated = points.map((r) => { return r.num });
        if (!isRepeated.includes(parseInt(newPoint))) {
            const create = await api.post(`establishment/${getId()}/points`, {
                num: newPoint,
                active: true,
                ocupied: false
            })
            const { data } = create;
            const desambiguation = data.success;
            if (desambiguation === true) {
                success(data.message)
                return true;
            } else {
                failure('Houve um problema ao criar seu ponto');
            }

        } else {
            warning('Não é possível adicionar um ponto com o número repetido!')
        }
    } catch (error) {
        console.log(error)
        failure('Houve um problema ao criar seu ponto');
    }

}