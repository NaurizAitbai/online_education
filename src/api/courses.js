import api from './api';


export const getCourses = () => {
    return api().get('/courses/');
}

export const getCourse = id => {
    return api().get(`/courses/${id}/`);
}

export const getMembers = id => {
    return api().get(`/courses/${id}/members/`);
}