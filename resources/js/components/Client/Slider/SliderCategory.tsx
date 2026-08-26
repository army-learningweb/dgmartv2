import { useSlider } from '@/hooks/use-slider';
import SliderTitle from './SliderTitle';
import SliderDesc from './SiderDesc';
import SliderButton from './SliderButton';
import SliderData from './SliderData';
import CategoryCard from '../CategoryCard/CategoryCard';

interface DataCategories {
    src: string;
    alt: string;
    title: string;
    desc: string;
    route: string;
}

interface SliderCategoryProps {
    data?: DataCategories[];
}

export default function SliderCategory({ data = [] }: SliderCategoryProps) {
    const itemVisible = 4;
    const { sliderTurn, mobilityIndex, index, handleSlide } = useSlider({
        data,
        itemVisibleAllowed: itemVisible,
        mobilityIndexProp: 420,
    });

    return (
        <>
            {data?.length > 0 && (
                <section className="relative pb-4">
                    <div className="mx-auto max-w-312">
                        {/* title */}
                        <SliderTitle title="Khám phá theo danh mục" />

                        {/* desc */}
                        <SliderDesc>
                            Tối ưu không gian làm việc và giải trí với hệ sinh
                            thái sản phẩm công nghệ đa dạng.
                        </SliderDesc>
                    </div>

                    {/* button */}
                    <SliderButton
                        data={data}
                        onClick={handleSlide}
                        itemVisible={itemVisible}
                        index={index}
                        sliderTurn={sliderTurn}   
                    />

                    {/* data */}
                    <SliderData mobilityIndex={mobilityIndex} index={index} height={`h-80`}>
                        {data.map((item, index) => (
                            <CategoryCard
                                key={item.title}
                                dataItem={item}
                                dataIndex={index}
                            />
                        ))}
                    </SliderData>
                </section>
            )}
        </>
    );
}
