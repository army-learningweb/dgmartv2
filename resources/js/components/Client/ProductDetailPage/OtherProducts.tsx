import { ProductSuggestProps } from "@/types/module/client_product";
import OtherProductItem from "./OtherProductItem";

interface OtherProductsProps {
    data : ProductSuggestProps;
}

export default function OtherProducts({data} : OtherProductsProps){
    return (
        <>
            <h2 className="text-xl font-medium">Sản phẩm tương tự</h2>
            <div className="mt-4 flex flex-col gap-4">
                {data.map((item) => (
                    <OtherProductItem key={item.id} dataItem={item}/>
                ))}
            </div>
        </>
    );
}