interface OrderInfoItem {
    title : string;
    children : React.ReactNode;
}

export default function OrderInfoItem({ title, children }: OrderInfoItem) {
    return (
        <div>
            <p className="font-medium">{title}</p>
            {children}
        </div>
    );
}