import React from 'react';
import CourseItem from './CourseItem';
import styles from './CourseList.module.css';


const CourseList = ({ courses }) => {
    return (
        <div className={styles.container}>
            {courses.map(course => {
                return (
                    <CourseItem className={styles.item} key={course.id} course={course} />
                )
            })}
        </div>
    )
}

export default CourseList;