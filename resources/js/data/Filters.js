const filters = [
    {
        title: 'Theo giá',
        options: [
            { label: 'Cao đến thấp', value: 'asc' },
            { label: 'Thấp đến cao', value: 'desc' },
        ],
    },
    {
        title: 'Hãng sản xuất',
        options: [
            { label: 'Dell', value: 'Dell' },
            { label: 'Lenovo', value: 'Lenovo' },
            { label: 'MSI', value: 'MSI' },
        ],
    },
    {
        title: 'Dung lượng Ram',
        options: [
            { label: '8GB', value: '8GB' },
            { label: '16GB', value: '16GB' },
            { label: '32GB', value: '32GB' },
        ],
    },
    {
        title: 'Ổ cứng',
        options: [
            { label: '256GB', value: '256GB' },
            { label: '512GB', value: '512GB' },
        ],
    },
    {
        title: 'Card đồ họa',
        options: [
            { label: 'NVIDIA Force Series', value: 'NVIDIA' },
            { label: 'AMD Radeon Series', value: 'AMD' },
            { label: 'Card Onboard', value: 'Onboard' },
        ],
    },
    {
        title: 'Màn hình',
        options: [
            { label: 'Khoảng 13 inch', value: '13inch' },
            { label: 'Khoảng 14 inch', value: '14inch' },
            { label: 'Trên 15 inch', value: '15inch' },
        ],
    },
];

export {filters}
