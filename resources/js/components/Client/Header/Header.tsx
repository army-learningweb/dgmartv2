import Logo from '@/components/ui/Logo';
import Nav from './Nav';
import { ModalSearch } from '../ModalSearch/ModalSearch';
import { useClientSearch } from '@/hooks/use-client-search';
import SearchButton from './SearchButton';
import ShoppingBagButton from './ShoppingBagButton';
import { SquareMenu, X } from 'lucide-react';
import { useState } from 'react';
import { useLockSscreen } from '@/hooks/use-lock-screen';

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

    const [openNav, setOpenNav] = useState<boolean>(false)

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

            {/* Header desktop */}
            <div className="hidden border-b border-gray-200 bg-white md:block">
                <header className="mx-auto flex max-w-312 items-center justify-between py-4">
                    <div className="flex gap-10">
                        <Logo route="/" className="w-[15%]" />
                        <Nav className="flex-1" />
                    </div>
                    <SearchButton onClick={handleOpenModal} />
                    <ShoppingBagButton />
                </header>
            </div>

            {/* Header Mobile */}
            <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-6 border-b border-gray-200 bg-white px-5 py-3 md:hidden">
                {!openNav && (
                    <SquareMenu
                        onClick={() => setOpenNav(true)}
                        size={30}
                        strokeWidth={1.7}
                        className="transtion-all text-gray-500 duration-200 active:scale-95 active:text-black"
                    />
                )}

                {openNav && (
                    <X
                        onClick={() => setOpenNav(false)}
                        size={30}
                        strokeWidth={1.7}
                        className="transtion-all text-gray-500 duration-200 active:scale-95 active:text-black"
                    />
                )}

                <SearchButton onClick={handleOpenModal} className="w-full!" />
                <ShoppingBagButton />
            </div>
            <div className="h-15 md:hidden"></div>

            <Nav
                className={`fixed z-50 w-full flex-1 border-b border-gray-300 transition-all duration-150 ease-out md:hidden ${
                    openNav
                        ? 'pointer-events-auto top-14 opacity-100'
                        : 'pointer-events-none top-16 opacity-0'
                } `}
            />

            {/* overlay dark */}
            {openNav && (
                <div className="fixed top-0 left-0 z-40 h-full w-full bg-black/30 md:hidden"></div>
            )}
        </>
    );
}
