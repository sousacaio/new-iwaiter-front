import api from '../../services/api';
import { getId } from '../../services/auth';
import { success, warning, failure } from '../toasts/toasts';

export const fetchEstablishmentCatalog = async () => {
    const response = await api.get(`establishment/${getId()}/catalog`);
    console.log(response)
    const { data } = response;
    const desambiguation = data.success;
    if (desambiguation === true) {
        return data.data[0].catalog;
    } else {
        failure('Não foi possível trazer seu catálogo')
    }
}

export const updateEstablishmentCatalog = async (product, id, file) => {
    try {
        if (!product.name || !product.value || !product.description || !product.category) {
            warning('Preencha todos os campos!')
        } else {
            if (!file) {
                warning("Selecione uma imagem para o produto");
                return;
            }
            const data = new FormData();
            data.append('image', file)
            data.append('name', product.name)
            data.append('value', product.value)
            data.append('category', product.category)
            data.append('description', product.description)
            data.append('lastphoto', product.photo)
            const response = await api.put(`establishment/${getId()}/catalog/${id}`, data)
            const { data: { errors, message } } = response
            if (!errors) {
                success(message);
                return true;
            } else {
                failure(message);
                return false;
            }
        }
    } catch (error) {
        failure('Houve um erro ao atualizar o item do seu catalogo');
    }
}

export const saveEstablishmentCatalog = async (product, file) => {
    try {
        if (!product.name || !product.value || !product.description || !product.category) {
            warning('Preencha todos os campos!')
        } else {
            const data = new FormData();
            data.append('image', file)
            data.append('name', product.name)
            data.append('value', product.value)
            data.append('category', product.category)
            data.append('description', product.description)
            const res = await api.post(`establishment/${getId()}/catalog`, data);
            const { data: { message, status } } = res;
            if (status === 201) {
                success(message)
                return true;
            } else {
                failure(message)
                return true;
            }
        }
    } catch (error) {
        failure('Houve um erro ao adicionar o item ao seu catalogo')
    }
}

