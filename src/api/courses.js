import api from './api';


export const getCourses = () => {
    return api().get('/courses/');
}