import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FirstTab from '../FirstTab';
import '@testing-library/jest-dom';

describe('FirstTab Component', () => {
    const mockOnUpdate = jest.fn();
    const defaultProps = {
        data: {
            attendeeNumber: '',
            attendeeNames: []
        },
        onUpdate: mockOnUpdate,
        isTabValid: false
    };

    beforeEach(() => {
        mockOnUpdate.mockClear();
    });

    it('should render without crashing', () => {
        const { getByText } = render(<FirstTab {...defaultProps} />);
        expect(getByText('Step 1')).toBeInTheDocument();
    });

    it('should update attendee number', () => {
        const { getByRole } = render(<FirstTab {...defaultProps} />);

        const select = getByRole('combobox');

        fireEvent.change(select, { target: { value: '3' } });

        waitFor(() => {
            expect(mockOnUpdate).toHaveBeenCalledWith({
                attendeeNumber: '3',
                attendeeNames: ['', '', '']
            });
        })
    });

    it('should update attendee name', () => {
        const props = {
            ...defaultProps,
            data: {
                attendeeNumber: '2',
                attendeeNames: ['', '']
            }
        };
        const { getByRole } = render(<FirstTab {...props} />);

        waitFor(() => {
            const input = getByRole('textbox', { name: 'attendee-name-1' });

            fireEvent.change(input, { target: { value: 'John Doe' } });
            expect(mockOnUpdate).toHaveBeenCalledWith({
                attendeeNames: ['John Doe', '']
            });
        })
    });

    it('should display attendee name inputs when attendee number is selected', () => {
        const props = {
            ...defaultProps,
            data: {
                attendeeNumber: '2',
                attendeeNames: ['', '']
            }
        };
        const { getByRole } = render(<FirstTab {...props} />);

        waitFor(() => {
            expect(getByRole('textbox', { name: 'attendee-name-1' })).toBeInTheDocument();
            expect(getByRole('textbox', { name: 'attendeeName-2' })).toBeInTheDocument();
        });
    });
});