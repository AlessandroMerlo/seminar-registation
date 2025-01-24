import React, { useState } from 'react';
import styles from './Tab.module.css'
import CheckmarkTab from './CheckmarkTab';
import FormData from '../models/FormData';
import { joinCssClasses, timingAnimationStateChange } from '../utils/UtilCss';
import { QUESTIONS } from '../utils/Constants';
import Tab from './Tab';

type SecondTabProps = {
    data: FormData['secondTab'],
    onUpdate: (data: Partial<FormData['secondTab']>) => void,
    isTabEnabled: boolean,
    isTabValid: boolean
}

const SecondtTab: React.FC<SecondTabProps> = (prop: SecondTabProps) => {

    const [isCompanyNameOpen, setCompanyNameOpen] = useState<boolean>(false);

    const onChangeBadgesRadio = (newValue: string): void => {
        timingAnimationStateChange(
            () => prop.onUpdate({
                isBadges: newValue
            }),
            newValue,
            setCompanyNameOpen,
            newValue === '1'
        );
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
        <Tab
            title='Step 2'
            isEnabled={prop.isTabEnabled}
            isValid={prop.isTabValid}
            footerContent={<CheckmarkTab isOpenCheckmark={prop.isTabValid} />}
            backgroudColor='#abdaec'
        >
            <div>
                <span>{QUESTIONS.secondTab.firstQuestion}</span>
                <div className={styles.radioContainer}>
                    <input
                        data-cy='badges-radio-on'
                        type='radio'
                        name='badges-radio'
                        id='badges-radio-on'
                        value={'1'}
                        onChange={(e) => onChangeBadgesRadio(e.target.value)}
                        checked={prop.data.isBadges === '1'}
                        aria-label='Yes'
                    />
                    <label htmlFor='badges-radio-on'>Yes</label>
                    <input
                        type='radio'
                        name='badges-radio'
                        id='badges-radio-off'
                        value={'0'}
                        onChange={(e) => onChangeBadgesRadio(e.target.value)}
                        checked={prop.data.isBadges === '0'}
                    />
                    <label htmlFor='badges-radio-off'>No</label>

                    <div
                        className='animatedContainer'
                        aria-expanded={isCompanyNameOpen && prop.data.isBadges !== null}
                    >
                        <label className={joinCssClasses([styles.inputTextLabel, 'youbee'])}>
                            Company Name:
                        </label>
                        <input
                            type='text'
                            value={prop.data.textInput}
                            onChange={(e) => onChangeCompanyNameInput(e.target.value)}
                            className={styles.companyNameInput}
                            data-cy='company-name-input'
                            name='company-name'
                        />
                    </div>
                </div>
            </div>
            <div className={styles.subSection}>
                <span>{QUESTIONS.secondTab.secondQuestion}</span>
                <div className={styles.radioContainer}>
                    <input
                        type='radio'
                        name='accomodations-radio'
                        id='accomodations-radio-on'
                        value={'1'}
                        onChange={(e) => onChangeAccomodationsRadio(e.target.value)}
                        checked={prop.data.isAccomodation === '1'}
                        aria-label='Yes'
                    />
                    <label htmlFor='accomodations-radio-on'>Yes</label>
                    <input
                        type='radio'
                        name='accomodations-radio'
                        id='accomodations-radio-off'
                        value={'0'}
                        onChange={(e) => onChangeAccomodationsRadio(e.target.value)}
                        checked={prop.data.isAccomodation === '0'}
                        data-cy='accommodation-radio-off'
                    />
                    <label htmlFor='accomodations-radio-off'>No</label>
                </div>
            </div>
        </Tab>
    </>;
}

export default SecondtTab;