import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ThirdTab from '../ThirdTab';
import '@testing-library/jest-dom';

describe('ThirdTab Component', () => {
    const mockOnUpdate = jest.fn();
    const mockResetForm = jest.fn();

    const defaultProps = {
        data: {
            isRock: false
        },
        onUpdate: mockOnUpdate,
        isTabEnabled: true,
        isTabValid: false,
        resetForm: mockResetForm
    };

    it('should render without crashing', () => {
        const { getByText } = render(<ThirdTab {...defaultProps} />);
        expect(getByText('Step 3')).toBeInTheDocument();
    });

    it('should update rock checkbox', () => {
        const { getByRole } = render(<ThirdTab {...defaultProps} />);

        waitFor(() => {
            const checkbox = getByRole('combobox', { name: 'is-rock-checkbox' });

            fireEvent.change(checkbox, { target: { checked: true } });
            expect(mockOnUpdate).toHaveBeenCalledWith({
                isRock: true
            });
        })
    });

    it('should call resetForm on button click', () => {
        const props = {
            ...defaultProps,
            data: {
                isRock: true
            }
        };
        const { getByRole } = render(<ThirdTab {...props} />);

        waitFor(() => {
            const button = getByRole('button', { name: 'complete-registration' });
            fireEvent.click(button);

            expect(mockResetForm).toHaveBeenCalled();
        })
    });

    it('should disable button when isTabValid is false', () => {
        const { getByRole } = render(<ThirdTab {...defaultProps} />);

        waitFor(() => {
            const button = getByRole('button', { name: 'complete-registration' });
            expect(button).toBeDisabled();
        })
    });

    it('should enable button when isTabValid is true', () => {
        const props = {
            ...defaultProps,
            isTabValid: true
        };

        const { getByRole } = render(<ThirdTab {...props} />);

        waitFor(() => {
            const button = getByRole('button', { name: 'complete-registration' });
            expect(button).not.toBeDisabled();
        })
    });
});