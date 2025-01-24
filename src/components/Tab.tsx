import React from 'react';
import styles from './Tab.module.css';
import { joinCssClasses } from '../utils/UtilCss';

type TabProps = {
    title: string;
    children: React.ReactNode;
    isEnabled: boolean;
    isValid: boolean;
    footerContent?: React.ReactNode;
    backgroudColor: string;
};

const Tab: React.FC<TabProps> = (prop: TabProps) => {

    return (
        <div
            className={joinCssClasses([
                styles.tab,
                !prop.isEnabled ? styles.disabled : '',
            ])}
            style={{ backgroundColor: prop.backgroudColor }}
        >
            <div className={styles.headerContainer}>
                <h2 className={joinCssClasses([styles.header, 'helvetica'])}>{prop.title}</h2>
            </div>
            <div className="youbee">
                <section className={styles.section}>
                    {prop.children}
                    {prop.footerContent}
                </section>
            </div>
        </div>
    );
};

export default Tab;