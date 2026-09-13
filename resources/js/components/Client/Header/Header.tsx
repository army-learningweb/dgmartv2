import Logo from '@/components/ui/Logo';
import Nav from './Nav';
import { ModalSearch } from '../ModalSearch/ModalSearch';
import { useClientSearch } from '@/hooks/use-client-search';
import SearchButton from './SearchButton';
import ShoppingBagButton from './ShoppingBagButton';

export default function Header() {
    const {
        ipRef,
        querySearch,
        dataSearch,
        isLoading,
        openModal,
        handleOpenModal,
        handleCloseModal,
        handleClearSearch,
        handleSearch,
    } = useClientSearch();

    return (
        <>
            {/* Modal Search */}
            <ModalSearch
                ref={ipRef}
                openModal={openModal}
                dataSearch={dataSearch}
                querySearch={querySearch}
                loadingStatus={isLoading}
                onClose={handleCloseModal}
                onClearSearch={handleClearSearch}
                onSearch={handleSearch}
            />

            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <header className="mx-auto flex max-w-312 items-center justify-between py-4">
                    <div className="flex gap-10">
                        <Logo route="/" className="w-[15%]" />
                        <Nav className="flex-1" />
                    </div>
                    <SearchButton onClick={handleOpenModal} />
                    <ShoppingBagButton />
                </header>
            </div>
        </>
    );
}
