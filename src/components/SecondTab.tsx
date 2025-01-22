import React from 'react';
import styles from './Tab.module.css'
import CheckmarkTab from './CheckmarkTab';
import FormData from '../models/FormData';
import { joinCssClasses } from '../utils/UtilCss';
import { QUESTIONS } from '../utils/Constants';

type Props = {
    data: FormData['secondTab'],
    onUpdate: (data: Partial<FormData['secondTab']>) => void,
    isTabEnabled: boolean,
    isTabValid: boolean
}

const SecondtTab: React.FC<Props> = (prop: Props) => {
    const onChangeBadgesRadio = (newValue: string): void => {
        prop.onUpdate({
            isBadges: newValue
        })
    }

    const onChangeCompanyNameInput = (newValue: string): void => {
        prop.onUpdate({
            textInput: newValue
        })
    }

    const onChangeAccomodationsRadio = (newValue: string): void => {
        prop.onUpdate({
            isAccomodation: newValue
        })
    }

    return <>
        <div className={joinCssClasses([
            styles.secondTab,
            styles.tab,
            !prop.isTabEnabled ? styles.disabled : ''
        ])}>
            <div className={styles.headerContainer}>
                <h2 className={joinCssClasses([styles.header, 'helvetica'])}>
                    Step 2
                </h2>
            </div>
            <div className='youbee'>
                <section className={styles.section}>
                    <div>
                        <span>{QUESTIONS.secondTab.firstQuestion}</span>
                        <div className={styles.radioContainer}>
                            <input
                                type='radio'
                                name='badgesRadio'
                                id='badgesRadioOn'
                                value={'1'}
                                onChange={(e) => onChangeBadgesRadio(e.target.value)}
                                checked={prop.data.isBadges === '1'}
                            />
                            <label htmlFor='badgesRadioOn'>Yes</label>
                            <input
                                type='radio'
                                name='badgesRadio'
                                id='badgesRadioOff'
                                value={'0'}
                                onChange={(e) => onChangeBadgesRadio(e.target.value)}
                                checked={prop.data.isBadges === '0'}
                            />
                            <label htmlFor='badgesRadioOff'>No</label>
                            {
                                prop.data.isBadges === '1' &&
                                <div>
                                    <label className={joinCssClasses([styles.inputTextLabel, 'youbee'])}>
                                        Company Name:
                                    </label>
                                    <input
                                        type='text'
                                        value={prop.data.textInput}
                                        onChange={(e) => onChangeCompanyNameInput(e.target.value)}
                                        className={styles.companyNameInput}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <span>{QUESTIONS.secondTab.secondQuestion}</span>
                        <div className={styles.radioContainer}>
                            <input
                                type='radio'
                                name='accomodationsRadio'
                                id='accomodationsRadioOn'
                                value={'1'}
                                onChange={(e) => onChangeAccomodationsRadio(e.target.value)}
                                checked={prop.data.isAccomodation === '1'}
                            />
                            <label htmlFor='accomodationsRadioOn'>Yes</label>
                            <input
                                type='radio'
                                name='accomodationsRadio'
                                id='accomodationsRadioOff'
                                value={'0'}
                                onChange={(e) => onChangeAccomodationsRadio(e.target.value)}
                                checked={prop.data.isAccomodation === '0'}
                            />
                            <label htmlFor='accomodationsRadioOff'>No</label>
                        </div>
                    </div>
                    {
                        prop.isTabValid &&
                        <footer>
                            <CheckmarkTab />
                        </footer>
                    }
                </section>
            </div>
        </div>
    </>;
}

export default SecondtTab;