import React from 'react';
import styles from './CheckmarkTab.module.css';

const CheckmarkTab: React.FC = () => {
    return <>
        <div className={styles.checkmarkContainer}>
            <div className={styles.checkmark}></div>
        </div>
    </>;
}

export default CheckmarkTab