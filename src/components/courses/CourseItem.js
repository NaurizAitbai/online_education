import React from 'react';
import styles from './CourseItem.module.css';
import classNames from 'classnames';


const CourseItem = ({ className, course }) => {
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.image}></div>
            <div className={styles.content}>
                <div className={styles.author}></div>
                <span className={styles.title}>{course.name}</span>
                <span className={styles.price}>{course.price}</span>
            </div>
            <div className={styles.stats}>
                <div className={styles.rating}>{course.rating}</div>
                <span className={styles.members}>{course.members}</span>
            </div>
        </div>
    )
}

export default CourseItem;