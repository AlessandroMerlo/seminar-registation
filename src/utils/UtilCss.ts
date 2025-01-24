export const joinCssClasses = (classes: string[]): string => {
    return classes.join(' ');
}

export const timingAnimationStateChange = <T>(
    func: (value: T) => void,
    value: T,
    stateFunc: (value: boolean) => void,
    stateFuncCondition: boolean
) => {
    stateFunc(false);

    setTimeout(() => {
        func(value);
    }, 250)

    setTimeout(() => {
        stateFunc(stateFuncCondition);
    }, 250)
}
