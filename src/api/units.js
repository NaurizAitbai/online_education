import api from './api';


export const getUnit = id => {
    return api().get(`/units/${id}/`);
}