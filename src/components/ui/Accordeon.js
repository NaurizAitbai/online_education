import React, { useState } from 'react';
import { faPlus as plusIcon, faMinus as minusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './Accordeon.module.css';


const Accordeon = ({ opened = false, title, children }) => {
    const [open, setOpen] = useState(opened);

    return (
        <div className={styles.container}>
            <header onClick={() => setOpen(!open)}>
                <span>{title}</span>
                <FontAwesomeIcon icon={open ? minusIcon : plusIcon} />
            </header>
            <div className={classNames({ [styles.active]: open })}>{children}</div>
        </div>
    )
}

export default Accordeon;