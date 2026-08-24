import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface ButtonActionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const ButtonAction = ({ children, className, ...props }: ButtonActionProps) => {
    return (
        <div
            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-300 shadow transition-transform duration-150 hover:border-gray-200 active:translate-y-0.5 pointer-events-auto ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

interface SliderButtonProps {
    data: any;
    onClick: (value: 'plus' | 'minus') => void;
    itemVisible: number;
    index: number;
    sliderTurn: number;
}

export default function SliderButton({ data, onClick, itemVisible, index, sliderTurn } : SliderButtonProps) {
    return (
        <>
            {data?.length > itemVisible && (
                <div
                    className={`pointer-events-none absolute z-50 mt-3 flex w-full items-center justify-between gap-2 px-15 top-1/2`}
                >
                    <ButtonAction
                        className={clsx('', {
                            'pointer-events-none scale-0': index === 0,
                        })}
                        onClick={() => onClick('minus')}
                    >
                        <ChevronLeft size={35} strokeWidth={1.7} />
                    </ButtonAction>

                    <ButtonAction
                        className={clsx('', {
                            'pointer-events-none scale-0': index === sliderTurn,
                        })}
                        onClick={() => onClick('plus')}
                    >
                        <ChevronRight size={35} strokeWidth={1.7} />
                    </ButtonAction>
                </div>
            )}
        </>
    );
}
