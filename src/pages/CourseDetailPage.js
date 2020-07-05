import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../api/courses';
import Rating from '../components/ui/Rating';
import Container from '../components/layouts/Container';
import styles from './CourseDetailPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers as membersIcon } from '@fortawesome/free-solid-svg-icons';


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
        <Container>
            {course && (
                <Fragment>
                    <h1>{course.name}</h1>
                    <div className={styles.stat}>
                        <Rating className={styles.rating} rating={3} />
                        <span className={styles.reviews}>(4 отзывов)</span>
                        <div className={styles.members}>
                            <FontAwesomeIcon icon={membersIcon} />
                            <span>{course.members} СТУДЕНТОВ</span>
                        </div>
                    </div>
                    <p>{course.short_description}</p>
                    <div className={styles.descriptionBlock}>
                        <img className={styles.image} src={course.thumbnail} alt={course.name} />
                        <div className={styles.sidebar}>
                            <button>TAKE THIS COURSE</button>
                            <div className={styles.instructors}>
                                <span>Instructor</span>
                                <div className={styles.instructor}>
                                    <div className={styles.avatar} style={{ backgroundImage: `url(${course.author.profile.avatar})`}}></div>
                                    <span>{ course.author.username }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Container>
    )
}

export default CourseDetailPage;