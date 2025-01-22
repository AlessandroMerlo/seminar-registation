import React from 'react';
import styles from './Tab.module.css'
import { joinCssClasses } from '../utils/UtilCss';
import { QUESTIONS } from '../utils/Constants';
import FormData from '../models/FormData';

type Props = {
    data: FormData['thirdTab'],
    onUpdate: (data: Partial<FormData['thirdTab']>) => void,
    isTabEnabled: boolean,
    isTabValid: boolean,
    resetForm: () => void
}

const ThirdTab: React.FC<Props> = (prop: Props) => {
    const onChangeRock = (newValue: boolean) => {
        prop.onUpdate({
            isRock: newValue
        });
    }

    return <>
        <div className={joinCssClasses([
            styles.thirdTab,
            styles.tab,
            !prop.isTabEnabled ? styles.disabled : ''
        ])}>
            <div className={styles.headerContainer}>
                <h2 className={joinCssClasses([styles.header, 'helvetica'])}>
                    Step 1
                </h2>
            </div>
            <div className='youbee'>
                <section className={styles.section}>
                    <div>
                        <span className={styles.question}>
                            {QUESTIONS.thirdTab.firstQuestion}
                        </span>
                        <input
                            type='checkbox'
                            onChange={(e) => onChangeRock(e.target.checked)}
                            checked={prop.data.isRock ?? false}
                        />
                    </div>
                    <footer>
                        <button
                            onClick={prop.resetForm}
                            disabled={!prop.isTabValid}
                        >Complete Registration</button>
                    </footer>
                </section>
            </div>
        </div>
    </>;
}

export default ThirdTab;