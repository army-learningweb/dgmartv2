import { ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../ProductCard/Card';

import { ProductDataProp } from '@/types/module/home';
import SliderButton from './SliderButton';
import SliderTitle from './SliderTitle';
import { useState } from 'react';
import clsx from 'clsx';
import { useSlider } from '@/hooks/use-slider';

interface SliderProductProp {
    data: ProductDataProp[];
    title: string;
    isShowBadgeNew?: boolean;
    isShowBadgeDiscount?: boolean;
}

export default function SliderProduct({
    data,
    title,
    isShowBadgeDiscount = false,
    isShowBadgeNew = false,

}: SliderProductProp) {
    
    const { sliderTurn, mobilityIndex, index, handleSlide } = useSlider({
        data,
        itemVisibleAllowed : 4,
        mobilityIndexProp : 316,
    });

    return (
        <>
            {data?.length > 0 && (
                <section className="space-y-5">
                    <div className="flex justify-between">
                        {/* title */}
                        <SliderTitle title={title} />

                        {/* button */}
                        <div className="flex items-center gap-2">
                            <SliderButton
                                className={clsx('', {
                                    'pointer-events-none opacity-50':
                                        index === 0,
                                })}
                                onClick={() => handleSlide('minus')}
                            >
                                <ChevronLeft />
                            </SliderButton>

                            <SliderButton
                                className={clsx('', {
                                    'pointer-events-none opacity-50': index === sliderTurn,
                                })}
                                onClick={() => handleSlide('plus')}
                            >
                                <ChevronRight />
                            </SliderButton>
                        </div>
                    </div>

                    {/* data */}
                    <div
                        style={{
                            transform: `translateX(-${mobilityIndex * index}px)`,
                        }}
                        className="transtion-tranform flex flex-nowrap gap-4 duration-500 ease-out"
                    >
                        {data.map((item) => (
                            <Card
                                key={item.id}
                                dataItem={item}
                                showBadgeDiscount={isShowBadgeDiscount}
                                showBadgeNew={isShowBadgeNew}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
