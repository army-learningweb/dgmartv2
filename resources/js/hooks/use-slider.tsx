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

    const sliderTurn = Math.round(data.length / itemVisibleAllowed);
    const mobilityIndex = mobilityIndexProp;
    const [index, setIndex] = useState<number>(0);

    const handleSlide = (action: 'plus' | 'minus') => {
        if (action === 'plus') {
            setIndex((prev) => Math.min(prev + 1, sliderTurn));
        } else {
            setIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    return { sliderTurn, mobilityIndex, index, handleSlide };
};