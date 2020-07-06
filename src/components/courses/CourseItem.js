import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseItem.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers as membersIcon } from '@fortawesome/free-solid-svg-icons';
import Rating from '../ui/Rating';


const CourseItem = ({ className, course }) => {
    return (
        <div className={classNames(styles.container, className)}>
            <Link to={`/courses/${course.id}/`} className={styles.image} style={{ backgroundImage: `url(${course.thumbnail})`}}></Link>
            <div className={styles.content}>
                <div className={styles.author} style={{ backgroundImage: `url(${course.author.profile.avatar})`}}></div>
                <Link to={`/courses/${course.id}`} className={styles.title}>{course.name}</Link>
                <span className={styles.price}>{course.price}</span>
            </div>
            <div className={styles.stats}>
                <Rating rating={course.rating} />
                <span className={styles.members}>
                    <FontAwesomeIcon icon={membersIcon} />
                    { course.members }
                </span>
            </div>
        </div>
    )
}

export default CourseItem;