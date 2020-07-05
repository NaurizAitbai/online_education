import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../api/courses';
import Rating from '../components/ui/Rating';
import styles from './CourseDetailPage.module.css';


const CourseDetailPage = () => {
    const [course, setCourse] = useState();

    const params = useParams();

    if (!course) {
        const id = params.id;
        getCourse(id).then(res => {
            setCourse(res.data);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <div>
            {course && (
                <Fragment>
                    <h1>{course.name}</h1>
                    <div className={styles.stat}>
                        <Rating className={styles.rating} rating={3} />
                        <span className={styles.reviews}>(4 отзывов)</span>
                        <span>58 СТУДЕНТОВ</span>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default CourseDetailPage;