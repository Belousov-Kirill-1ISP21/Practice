import styles from '../css/General/HeaderStyle.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <div className={styles.Header} id="Header">

        <Link to="/" className={styles.HeaderLink}>
            <button className={styles.HeaderButton}>
                Практика 1
            </button>
        </Link>

        <Link to="/Practice2" className={styles.HeaderLink}>
            <button className={styles.HeaderButton}>
                Практика 2
            </button>
        </Link>

        <Link to="/Practice3" className={styles.HeaderLink}>
            <button className={styles.HeaderButton}>
                Практика 3
            </button>
        </Link>

        <Link to="/Practice4" className={styles.HeaderLink}>
            <button className={styles.HeaderButton}>
                Практика 4
            </button>
        </Link>

        <Link to="/Practice5" className={styles.HeaderLink}>
            <button className={styles.HeaderButton}>
                Практика 5
            </button>
        </Link>
 
    </div>
    )
}