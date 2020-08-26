import { FETCH_CATALOG, FETCH_ADDRESS, FETCH_SETTINGS, STORE_ORDERS } from './main-types/main-actions'

//add cart action
export const fetchCatalog = (data) => {
    return {
        type: FETCH_CATALOG,
        data
    }
}
export const fetchAddress = (data) => {
    return {
        type: FETCH_ADDRESS,
        data
    }
}
export const fetchSettings = (data) => {
    return {
        type: FETCH_SETTINGS,
        data
    }
}
export const storeOrders = (orders) => {
    return {
        type: STORE_ORDERS,
        orders
    }
}
