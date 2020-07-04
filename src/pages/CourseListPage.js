import React from 'react';
import CourseList from '../components/courses/CourseList';


const CourseListPage = () => {
    const courses = [
        {id: 1, name: 'Software Training', price: '$88.00 per 3 months', rating: 4, members: 58},
        {id: 2, name: 'Developing Mobile Apps', price: 'FREE', rating: 3, members: 140},
        {id: 3, name: 'How to develop Mac Apps', price: 'PRIVATE', rating: 4.5, members: 29},
        {id: 4, name: 'Learn Guitar', price: 'PRIVATE', rating: 4, members: 6}
    ];

    return (
        <div><CourseList courses={courses} /></div>
    )
}

export default CourseListPage;