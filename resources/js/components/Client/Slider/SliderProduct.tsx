import Card from '../ProductCard/Card';

import { ProductDataProp } from '@/types/module/home';
import SliderButton from './SliderButton';
import SliderTitle from './SliderTitle';
import SliderDesc from './SiderDesc';
import SliderData from './SliderData';
import { useSlider } from '@/hooks/use-slider';

interface SliderProductProp {
    data: any[];
    title: string;
    desc: string;
    isShowBadgeNew?: boolean;
    isShowBadgeDiscount?: boolean;
}

export default function SliderProduct({
    data,
    title,
    desc,
}: SliderProductProp) {
    const ItemVisible = 5;
    const { sliderTurn, mobilityIndex, index, handleSlide } = useSlider({
        data,
        itemVisibleAllowed: ItemVisible,
        mobilityIndexProp: 256,
    });

    return (
        <>
            {data?.length > 0 && (
                <section className="relative">
                    <div className="mx-auto max-w-312">
                        {/* title */}
                        <SliderTitle title={title} />

                        {/* desc */}
                        <SliderDesc>{desc}</SliderDesc>
                    </div>

                    {/* button */}
                    <SliderButton
                        data={data}
                        onClick={handleSlide}
                        itemVisible={ItemVisible}
                        index={index}
                        sliderTurn={sliderTurn}
                    />

                    {/* data */}
                    <SliderData mobilityIndex={mobilityIndex} index={index}>
                        {data.map((item) => (
                            <Card
                                key={item.id}
                                dataItem={item}    
                            />
                        ))}
                    </SliderData>
                </section>
            )}
        </>
    );
}
