import { ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../ProductCard/Card';

import { ProductDataProp } from '@/types/module/home';
import SliderButton from './SliderButton';
import SliderTitle from './SliderTitle';
import { useState } from 'react';
import clsx from 'clsx';

interface SliderProductProp {
    data: ProductDataProp[];
    title: string;
}

export default function SliderProduct({ data, title }: SliderProductProp) {

    const sliderTurn = Math.floor(data.length / 5);
    const mobilityIndex = 259
    const [index, setIndex] = useState<number>(0)

    const handleSlide = (action : 'plus' | 'minus') => {
        if(action === 'plus'){
            setIndex((prev) => Math.min(prev + 1, sliderTurn));
        }else{
            setIndex((prev) => Math.max(prev - 1, 0));
        }
    }

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
                                    'pointer-events-none opacity-50': index === 0
                                })}
                                onClick={() => handleSlide('minus')}
                            >
                                <ChevronLeft />
                            </SliderButton>

                            <SliderButton
                                className={clsx('', {
                                    'pointer-events-none opacity-50': Math.min(
                                        index,
                                        sliderTurn,
                                    ),
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
                                showBadgeNew
                                showBadgeDiscount
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
