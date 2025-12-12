import styles from '../css/General/HeaderStyle.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <div className={styles.Header} id="Header">
        
        <button className={styles.HeaderButton}>
            <Link to="/" className={styles.HeaderLink}>Практика 1</Link>
        </button>

        <button className={styles.HeaderButton}>
            <Link to="/Practice2" className={styles.HeaderLink}>Практика 2</Link>
        </button>

        <button className={styles.HeaderButton}>
            <Link to="/Practice3" className={styles.HeaderLink}>Практика 3</Link>
        </button>
 
    </div>
    )
}