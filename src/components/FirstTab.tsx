import React, { useState } from 'react';
import styles from './Tab.module.css'
import CheckmarkTab from './CheckmarkTab';
import FormData from '../models/FormData';
import { joinCssClasses, timingAnimationStateChange } from '../utils/UtilCss';
import { QUESTIONS } from '../utils/Constants';
import Tab from './Tab';
import '../App/App.css';

type FirstTabProps = {
    data: FormData['firstTab'],
    onUpdate: (data: Partial<FormData['firstTab']>) => void,
    isTabValid: boolean
}

const FirstTab: React.FC<FirstTabProps> = (prop: FirstTabProps) => {
    const [isAttendeeNameOpen, setAttendeeNameOpen] = useState<boolean>(false);

    const onChangeAttendeeNumber = (newValue: string): void => {
        timingAnimationStateChange(
            () => prop.onUpdate({
                attendeeNumber: newValue,
                attendeeNames: newValue === '' ? [] : Array(parseInt(newValue)).fill('')
            }),
            newValue,
            setAttendeeNameOpen,
            newValue !== ''
        );
    }

    const onChangeAttendeeName = (index: number, newValue: string): void => {
        const newAttendeeNames = [...prop.data.attendeeNames];
        newAttendeeNames[index] = newValue;
        prop.onUpdate({ attendeeNames: newAttendeeNames });
    }

    return <>
        <Tab
            title='Step 1'
            isEnabled={true}
            isValid={prop.isTabValid}
            footerContent={<CheckmarkTab isOpenCheckmark={prop.isTabValid} />}
            backgroudColor='#aaeac6'
        >
            <div>
                <span>{QUESTIONS.firstTab.firstQuestion}</span>
                <select
                    data-cy='attendee-number-select'
                    onChange={(e) => onChangeAttendeeNumber(e.target.value)}
                    className={styles.attendeeeNumberSelect}
                    value={prop.data.attendeeNumber}
                    role='combobox'
                >
                    <option value=''>Please Choose</option>
                    {
                        [...Array(5)].map((x, i) =>
                            <option value={`${i + 1}`} key={i + 1}>{i + 1}</option>
                        )
                    }
                </select>
            </div>
            <div
                className={'animatedContainer'}
                aria-expanded={isAttendeeNameOpen && prop.data.attendeeNumber !== ''}
            >
                <p className={joinCssClasses([styles.attendeeNamesParagraph, 'helvetica'])}>
                    Please provide full names:
                </p>
                <div className={styles.attendeeNamesContainer}>
                    {
                        prop.data.attendeeNames.map((x, i) => {
                            const count = i + 1;
                            return <React.Fragment key={count}>
                                <label
                                    htmlFor={`attendee-name-${count}`}
                                    className={styles.inputTextLabel}>
                                    Attendee {count} Name:
                                </label>
                                <input
                                    type='text'
                                    id={`attendee-name-${count}`}
                                    value={x}
                                    onChange={(e) => onChangeAttendeeName(i, e.target.value)}
                                    className={styles.attendeeNamesInput}
                                    data-cy={`attendee-name-input-${count}`}
                                    name={`attendee-name-${count}`}
                                />
                            </React.Fragment>
                        }
                        )
                    }
                </div>
            </ div>
        </Tab >
    </>;
}

export default FirstTab;