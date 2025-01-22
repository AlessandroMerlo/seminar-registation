import React, { useState } from 'react';
import styles from './Tab.module.css'
import CheckmarkTab from './CheckmarkTab';
import FormData from '../models/FormData';
import { joinCssClasses } from '../utils/UtilCss';
import { QUESTIONS } from '../utils/Constants';

type Props = {
    data: FormData['firstTab'],
    onUpdate: (data: Partial<FormData['firstTab']>) => void,
    isTabValid: boolean
}

const FirstTab: React.FC<Props> = (prop: Props) => {

    const onChangeAttendeeNumber = (newValue: string): void => {
        prop.onUpdate({
            attendeeNumber: newValue,
            attendeeNames: newValue === '' ? [] : Array(parseInt(newValue)).fill('')
        });
    }

    const onChangeAttendeeName = (index: number, newValue: string): void => {
        const newAttendeeNames = [...prop.data.attendeeNames];
        newAttendeeNames[index] = newValue;
        prop.onUpdate({ attendeeNames: newAttendeeNames });
    }

    return <>
        <div className={joinCssClasses([styles.firstTab, styles.tab])}>
            <div className={styles.headerContainer}>
                <h2 className={joinCssClasses([styles.header, 'helvetica'])}>
                    Step 1
                </h2>
            </div>
            <div className='youbee'>
                <section className={styles.section}>
                    <span>{QUESTIONS.firstTab.firstQuestion}</span>
                    <select
                        onChange={(e) => onChangeAttendeeNumber(e.target.value)}
                        className={styles.attendeeeNumberSelect}
                        value={prop.data.attendeeNumber}
                    >
                        <option value=''>Please Choose</option>
                        {
                            [...Array(5)].map((x, i) =>
                                <option value={`${i + 1}`} key={i + 1}>{i + 1}</option>
                            )
                        }
                    </select>
                    {
                        prop.data.attendeeNames.length > 0 &&
                        <div className={styles.attendeeNameSection}>
                            <p className={joinCssClasses([styles.attendeeNamesParagraph, 'helvetica'])}>
                                Please provide full names:
                            </p>
                            <div className={styles.attendeeNamesContainer}>
                                {
                                    prop.data.attendeeNames.map((x, i) => {
                                        const count = i + 1;
                                        return <React.Fragment key={count}>
                                            <label
                                                htmlFor={`attendeeName-${count}`}
                                                className={styles.inputTextLabel}>
                                                Attendee {count} Name:
                                            </label>
                                            <input
                                                type='text'
                                                id={`attendeeName-${count}`}
                                                value={x}
                                                onChange={(e) => onChangeAttendeeName(i, e.target.value)}
                                                className={styles.attendeeNamesInput}
                                            />
                                        </React.Fragment>
                                    }
                                    )
                                }
                            </div>
                        </ div>
                    }
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

export default FirstTab;