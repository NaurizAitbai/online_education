import React, { useState } from 'react';
import { faPlus as openedIcon, faMinus as closedIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './Accordeon.module.css';


const Accordeon = ({ opened = false, title, children }) => {
    const [open, setOpen] = useState(opened);

    return (
        <div className={styles.container}>
            <header onClick={() => setOpen(!open)}>
                <span>{title}</span>
                <FontAwesomeIcon icon={open ? openedIcon : closedIcon} />
            </header>
            <div className={classNames({ [styles.active]: open })}>{children}</div>
        </div>
    )
}

export default Accordeon;