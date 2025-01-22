import React, { useState } from 'react';
import styles from './Main.module.css';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import FormData from '../models/FormData';

const Main: React.FC = () => {
    const startFormData: FormData = {
        firstTab: {
            attendeeNumber: '',
            attendeeNames: [],
        },
        secondTab: {
            isBadges: null,
            textInput: '',
            isAccomodation: null
        },
        thirdTab: {
            isRock: null
        }
    };

    const [formData, setFormData] = useState<FormData>(startFormData);

    const updateFirstTab = (data: Partial<FormData['firstTab']>): void => {
        setFormData(old => ({
            ...old,
            firstTab: { ...old.firstTab, ...data }
        }));
    }

    const updateSecondTab = (data: Partial<FormData['secondTab']>): void => {
        setFormData(old => ({
            ...old,
            secondTab: { ...old.secondTab, ...data }
        }));
    }

    const updateThirdTab = (data: Partial<FormData['thirdTab']>): void => {
        setFormData(old => ({
            ...old,
            thirdTab: { ...old.thirdTab, ...data }
        }));
    }

    const isFirstTabValid = (): boolean => {
        const firstData = formData.firstTab;

        if (!firstData.attendeeNumber) {
            return false;
        }

        return firstData.attendeeNames.every(name => name.trim() !== '');
    }

    const isSecondTabValid = (): boolean => {
        const secondData = formData.secondTab;

        if (secondData.isBadges === null) {
            return false;
        }

        if (secondData.isBadges === '1' && (secondData && secondData.textInput?.trim() === '')) {
            return false;
        }

        return secondData.isAccomodation !== null && isFirstTabValid();
    }

    const isThirdTabValid = (): boolean => {
        return isFirstTabValid() && isSecondTabValid();
    }

    const reset = (): void => {
        setFormData(startFormData);
    }

    return <main className={styles.mainContainer}>
        <FirstTab data={formData.firstTab} onUpdate={updateFirstTab} isTabValid={isFirstTabValid()} />
        <SecondTab data={formData.secondTab} onUpdate={updateSecondTab} isTabEnabled={isFirstTabValid()} isTabValid={isSecondTabValid()} />
        <ThirdTab data={formData.thirdTab} onUpdate={updateThirdTab} isTabEnabled={isSecondTabValid()} resetForm={reset} isTabValid={isThirdTabValid()} />
    </main>;
}

export default Main;