import React from 'react';
import classNames from 'classnames';
import styles from './Rating.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starIcon } from '@fortawesome/free-solid-svg-icons';


const Rating = ({ className, rating }) => {
    return (
        <div className={classNames(styles.rating, className)}>
            {[...Array(5).keys()].map(value => {
                const starClasses = classNames(styles.star, {
                    [styles.active]: rating >= value + 1
                });

                return (
                    <FontAwesomeIcon className={starClasses} icon={starIcon} />
                )
            })}
        </div>
    )
}

export default Rating;