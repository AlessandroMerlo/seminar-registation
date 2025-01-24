import React from 'react';
import styles from './CheckmarkTab.module.css';
import '../App/App.css'

type CheckmarkProp = {
    isOpenCheckmark: boolean;
}

const CheckmarkTab: React.FC<CheckmarkProp> = (prop: CheckmarkProp) => {
    return <>
        <div className={'animatedContainer'} aria-expanded={prop.isOpenCheckmark}>
            <div className={styles.checkmarkContainer}>
                <div className={styles.checkmark}></div>
            </div>
        </div>
    </>;
}

export default CheckmarkTab