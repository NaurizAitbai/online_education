import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';


const Header = () => {
    return (
        <header className={styles.container}>
            <Link to='/' className={styles.brand}>ONLINE EDUCATION</Link>
            <ul className={styles.menu}>
                <li>Все курсы</li>
                <li>Меню 1</li>
                <li>Меню 2</li>
            </ul>
            <div className={styles.search}>SEARCH</div>
            <div className={styles.auth}>AUTH</div>
        </header>
    )
}

export default Header;