import SliderButton from '../SliderProduct/SliderButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useSlider } from '@/hooks/use-slider';
import SliderTitle from './SliderTitle';
import CategoryCard from './CategoryCard';

interface DataCategories {
    src: string;
    alt: string;
    title: string;
    desc: string;
    route: string;
}

interface SliderCategoryProps {
    data?: DataCategories[]
}

export default function SliderCategory({data = []} : SliderCategoryProps) {
    const itemVisible = 3;
   const { sliderTurn, mobilityIndex, index, handleSlide } = useSlider({
       data,
       itemVisibleAllowed: itemVisible,
       mobilityIndexProp: 420
   });

    return (
        <>
            {data?.length > 0 && (
                <>
                    <div className="flex items-center justify-between">
                        {/* title */}
                        <SliderTitle title="Cửa hàng" />

                        {/* button */}
                        {data?.length > itemVisible && (
                            <div className="mt-3 flex items-center gap-2">
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
                                        'pointer-events-none opacity-50':
                                            index === sliderTurn,
                                    })}
                                    onClick={() => handleSlide('plus')}
                                >
                                    <ChevronRight />
                                </SliderButton>
                            </div>
                        )}
                    </div>

                    {/* data */}
                    <div
                        style={{
                            transform: `translateX(-${mobilityIndex * index}px)`,
                        }}
                        className="flex h-120 flex-nowrap gap-4 transition-transform duration-500 ease-out select-none"
                    >
                        {data.map((item, index) => (
                            <CategoryCard
                                key={item.title}
                                dataItem={item}
                                dataIndex={index}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
