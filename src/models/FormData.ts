export default interface FormData {
    firstTab: {
        attendeeNumber: string;
        attendeeNames: string[];
    };
    secondTab: {
        isBadges: string | null;
        textInput?: string;
        isAccomodation: string | null;
    };
    thirdTab: {
        isRock: boolean | null;
    };
}