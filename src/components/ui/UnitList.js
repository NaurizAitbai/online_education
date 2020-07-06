import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UnitList.module.css';


const UnitList = ({ units }) => {
    return (
        <ul className={styles.container}>
            {units.map(unit => (
                <li>
                    <Link to={`/units/${unit.id}`}>
                        {unit.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default UnitList;