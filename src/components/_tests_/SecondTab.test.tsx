import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SecondtTab from '../SecondTab';
import '@testing-library/jest-dom';

describe('SecondTab Component', () => {
    const mockOnUpdate = jest.fn();
    const defaultProps = {
        data: {
            isBadges: '',
            textInput: '',
            isAccomodation: ''
        },
        onUpdate: mockOnUpdate,
        isTabEnabled: true,
        isTabValid: false
    };

    it('should render without crashing', () => {
        const { getByText } = render(<SecondtTab {...defaultProps} />);
        expect(getByText('Step 2')).toBeInTheDocument();
    });

    it('should update badges radio button', () => {
        const { getAllByRole } = render(<SecondtTab {...defaultProps} />);

        waitFor(() => {
            const radio = getAllByRole('radio', { name: 'badges-radio' }).find(radio => radio.ariaLabel === 'Yes');

            fireEvent.change(radio!, { target: { value: '1' } });
            expect(mockOnUpdate).toHaveBeenCalledWith({
                isBadges: '1'
            });
        })
    });

    it('should update company name input', () => {
        const props = {
            ...defaultProps,
            data: {
                isBadges: '1',
                textInput: '',
                isAccomodation: ''
            }
        };
        const { getByRole } = render(<SecondtTab {...props} />);

        waitFor(() => {
            const input = getByRole('textbox', { name: 'company-name' });

            fireEvent.change(input, { target: { value: 'Subito.it' } });
            expect(mockOnUpdate).toHaveBeenCalledWith({
                textInput: 'Subito.it'
            });
        })
    });

    it('should update accommodations radio button', () => {
        const { getAllByRole } = render(<SecondtTab {...defaultProps} />);

        waitFor(() => {
            const radio = getAllByRole('radio', { name: 'accomodations-radio' }).find(radio => radio.ariaLabel === 'Yes');

            fireEvent.change(radio!, { target: { value: '1' } });
            expect(mockOnUpdate).toHaveBeenCalledWith({
                isAccomodation: '1'
            });
        })
    });

    it('should display company name input when badges radio is selected', () => {
        const props = {
            ...defaultProps,
            data: {
                isBadges: '1',
                textInput: '',
                isAccomodation: ''
            }
        };
        const { getByRole } = render(<SecondtTab {...props} />);

        waitFor(() => {
            const input = getByRole('textbox', { name: 'company-name' });
            expect(input).toBeInTheDocument();
        })
    });
});