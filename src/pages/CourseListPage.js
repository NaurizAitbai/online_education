import React, { useState } from 'react';
import CourseList from '../components/courses/CourseList';
import Container from '../components/layouts/Container';
import { getCourses } from '../api/courses';


const CourseListPage = () => {
    const [courses, setCourses] = useState([]);

    if(!courses.length) {
        getCourses().then(res => {
            setCourses(res.data.results);
        })
    }

    return (
        <Container><CourseList courses={courses} /></Container>
    )
}

export default CourseListPage;