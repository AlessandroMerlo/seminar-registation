import React from 'react';
import styles from './Tab.module.css'
import { QUESTIONS } from '../utils/Constants';
import FormData from '../models/FormData';
import Tab from './Tab';

type ThirdTabProps = {
    data: FormData['thirdTab'],
    onUpdate: (data: Partial<FormData['thirdTab']>) => void,
    isTabEnabled: boolean,
    isTabValid: boolean,
    resetForm: () => void
}

const ThirdTab: React.FC<ThirdTabProps> = (prop: ThirdTabProps) => {

    const onChangeRock = (newValue: boolean) => {
        prop.onUpdate({
            isRock: newValue
        });
    }

    return <>
        <Tab
            title='Step 3'
            isEnabled={prop.isTabEnabled}
            isValid={prop.isTabValid}
            backgroudColor='#edc5aa'
        >
            <div>
                <span className={styles.question}>
                    {QUESTIONS.thirdTab.firstQuestion}
                </span>
                <input
                    type='checkbox'
                    onChange={(e) => onChangeRock(e.target.checked)}
                    checked={prop.data.isRock ?? false}
                    data-cy='is-rock-checkbox'
                    name='is-rock-checkbox'
                />
            </div>
            <footer>
                <div className={styles.subSection}>
                    <button
                        onClick={prop.resetForm}
                        disabled={!prop.isTabValid}
                        data-cy='complete-registration'
                        name='complete-registration'
                    >
                        Complete Registration
                    </button>
                </div>
            </footer>
        </Tab>
    </>;
}

export default ThirdTab;