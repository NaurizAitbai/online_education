import React, { useState } from 'react';
import CourseList from '../components/courses/CourseList';
import { getCourses } from '../api/courses';


const CourseListPage = () => {
    const [courses, setCourses] = useState([]);

    if(!courses.length) {
        getCourses().then(res => {
            setCourses(res.data.results);
        })
    }

    return (
        <div><CourseList courses={courses} /></div>
    )
}

export default CourseListPage;