import { useEffect } from 'react';
import { initBackButton, initMainButton } from '@telegram-apps/sdk';

type UseTelegramButtonsProps = {
    onBack: () => void;
    onNext: () => void;
    isLastStep: boolean;
};

export function useTelegramButtons({ onBack, onNext, isLastStep }: UseTelegramButtonsProps) {
    useEffect(() => {
        const [backButton] = initBackButton();
        const [mainButton] = initMainButton();

        backButton.show()
        backButton.on('click', () => {
            if (isLastStep) backButton.hide()

            isLastStep = false
            onBack()
        });

        mainButton.show();
        mainButton.enable();
        mainButton.setText(isLastStep ? 'Finish' : 'Continue');
        mainButton.on('click', () => {
            if (!isLastStep) {
                onNext();
            } else {
                console.log('Submit')
                mainButton.hide()
                // alert('Submission logic here');
            }
        });

        return () => {
            backButton.off('click', onBack);
            mainButton.off('click', onNext);
        };
    }, [isLastStep, onBack, onNext]);
}