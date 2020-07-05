import React from 'react';
import styles from './CourseItem.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starIcon, faUsers as membersIcon } from '@fortawesome/free-solid-svg-icons';


const CourseItem = ({ className, course }) => {
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.image} style={{ backgroundImage: `url(${course.thumbnail})`}}></div>
            <div className={styles.content}>
                <div className={styles.author} style={{ backgroundImage: `url(${course.author.profile.avatar})`}}></div>
                <span className={styles.title}>{course.name}</span>
                <span className={styles.price}>{course.price}</span>
            </div>
            <div className={styles.stats}>
                <div className={styles.rating}>
                    {[...Array(5).keys()].map(value => {
                        const starClasses = classNames(styles.star, {
                            [styles.active]: course.rating >= value + 1
                        })
                        return (
                            <FontAwesomeIcon className={starClasses} icon={starIcon} />
                        )
                    })}
                </div>
                <span className={styles.members}>
                    <FontAwesomeIcon icon={membersIcon} />
                    {course.members}
                </span>
            </div>
        </div>
    )
}

export default CourseItem;