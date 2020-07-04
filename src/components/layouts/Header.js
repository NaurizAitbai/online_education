import React from 'react';
import { Link } from 'react-router-dom';
import { faSearch as searchIcon, faUser as userIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';


const Header = () => {
    return (
        <header className={styles.container}>
            <Link to='/' className={styles.brand}>ONLINE EDUCATION</Link>
            <ul className={styles.menu}>
                <li><Link to='/courses/'>Все курсы</Link></li>
                <li>Меню 1</li>
                <li>Меню 2</li>
            </ul>
            <form className={styles.search}>
                <input type="text" placeholder="What do you want to learn?" />
                <button type="submit"><FontAwesomeIcon icon={searchIcon} /></button>
            </form>
            <button className={styles.auth}><FontAwesomeIcon icon={userIcon} /></button>
        </header>
    )
}

export default Header;