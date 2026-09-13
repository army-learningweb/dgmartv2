import { forwardRef } from 'react';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalContent from './ModalContent';
import ModalWrapper from './ModalWrapper';

interface ModalSearchProps {
    openModal: boolean;
    querySearch: string;
    loadingStatus: boolean;
    dataSearch: any[];
    onClose: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: () => void;
}

export const ModalSearch = forwardRef<HTMLInputElement, ModalSearchProps>(
    (
        {
            openModal,
            querySearch,
            loadingStatus,
            dataSearch,
            onClose,
            onSearch,
            onClearSearch,
        },
        ref,
    ) => {
        return (
            <ModalWrapper openModal={openModal}>
                {/* search */}
                <ModalHeader
                    onClose={onClose}
                    onSearch={onSearch}
                    onClearSearch={onClearSearch}
                    querySearch={querySearch}
                    loadingStatus={loadingStatus}
                    ref={ref}
                />

                <ModalContent
                    data={dataSearch}
                    querySearch={querySearch}
                    loadingStatus={loadingStatus}
                />

                <ModalFooter />
            </ModalWrapper>
        );
    },
);
