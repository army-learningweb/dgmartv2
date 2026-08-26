import { Head } from '@inertiajs/react';
import Select from '@/components/ui/Select';
import { Funnel } from 'lucide-react';
import Card from '@/components/Client/ProductCard/Card';

import { ReadDataProduct } from '@/types/module/client_product';

export default function Read({ products }: ReadDataProduct) {
    console.log(products);
    return (
        <div className="mx-auto max-w-312 space-y-10">
            <Head title="Sản phẩm" />

            <h1
                className={`inline-block text-5xl font-bold tracking-tight select-none mt-5`}
            >
                Laptop
            </h1>

            <div className="flex-1 space-y-4 p-2">
                <div className="flex items-center justify-between">
                    <p className="mt-2 font-medium tracking-tight text-gray-700">
                        Hiển thị (15 sản phẩm)
                    </p>

                    <div className="flex items-center gap-2">
                        <Select
                            name="filter_price"
                            className="text-[13px]! tracking-tight"
                        >
                            <option value="">Sắp xếp theo giá</option>
                            <option value="">Cao đến thấp</option>
                            <option value="">Thấp đến cao</option>
                        </Select>
                        <Funnel strokeWidth={1.5} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {products.data.map((item) => (
                        <Card key={item.id} dataItem={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
