import { useSlider } from '@/hooks/use-slider';
import SliderTitle from './SliderTitle';
import SliderDesc from './SiderDesc';
import SliderButton from './SliderButton';
import SliderData from './SliderData';
import Card from '../PostCard/Card';

import { PostDataProp } from '@/types/module/home';

interface SliderPostProps {
    data: PostDataProp[];
    title: string;
    desc: string;
}

export default function SliderPost({ data, title, desc }: SliderPostProps) {

    const ItemVisible = 5
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
                                // url={item.slug}
                            />
                        ))}
                    </SliderData>
                </section>
            )}
        </>
    );
}
