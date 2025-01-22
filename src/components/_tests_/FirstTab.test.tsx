import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstTab from '../FirstTab';
import FormData from '../../models/FormData';
import '@testing-library/jest-dom'

// Mock delle costanti e delle funzioni di utilità
jest.mock('../../utils/Constants', () => ({
    QUESTIONS: {
        firstTab: {
            firstQuestion: 'How many attendees will be there?',
        },
    },
}));

jest.mock('../../utils/UtilCss', () => ({
    joinCssClasses: (classes: string[]) => classes.join(' '),
}));

jest.mock('../CheckmarkTab', () => () => <div data-testid="checkmark-tab">Checkmark</div>);

// Mock dei dati di esempio
const mockData: FormData['firstTab'] = {
    attendeeNumber: '',
    attendeeNames: [],
};

const mockOnUpdate = jest.fn();

describe('FirstTab Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component with the initial state', () => {
        render(
            <FirstTab data={mockData} onUpdate={mockOnUpdate} isTabValid={false} />
        );

        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('How many attendees will be there?')).toBeInTheDocument();
        expect(screen.getByText('Please Choose')).toBeInTheDocument();
    });

    it('updates attendee number and names correctly', () => {
        render(
            <FirstTab data={mockData} onUpdate={mockOnUpdate} isTabValid={false} />
        );

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '3' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({
            attendeeNumber: '3',
            attendeeNames: ['', '', ''],
        });
    });

    it('updates attendee names correctly', () => {
        const dataWithAttendees = {
            ...mockData,
            attendeeNumber: '2',
            attendeeNames: ['', ''],
        };

        render(
            <FirstTab data={dataWithAttendees} onUpdate={mockOnUpdate} isTabValid={false} />
        );

        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'John' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({
            attendeeNames: ['John', ''],
        });
    });

    it('renders the checkmark when isTabValid is true', () => {
        render(
            <FirstTab data={mockData} onUpdate={mockOnUpdate} isTabValid={true} />
        );

        expect(screen.getByTestId('checkmark-tab')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { asFragment } = render(
            <FirstTab data={mockData} onUpdate={mockOnUpdate} isTabValid={false} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});