import { useState } from "react";

interface useSliderProps {
    data: any;
    itemVisibleAllowed: number;
    mobilityIndexProp: number;
}

export const useSlider = ({
    data,
    itemVisibleAllowed,
    mobilityIndexProp,
}: useSliderProps) => {

    const sliderTurn = data.length - itemVisibleAllowed;
    const mobilityIndex = mobilityIndexProp;
    const [index, setIndex] = useState<number>(0);

    const handleSlide = (action: 'plus' | 'minus') => {
        if (action === 'plus') {
            setIndex((prev) => prev + 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    return { sliderTurn, mobilityIndex, index, handleSlide };
};