interface ModalWrapper {
    children: React.ReactNode;
    openModal: boolean;
}

export default function ModalWrapper({children, openModal} : ModalWrapper){
    return (
        <>
            {/* Modal search */}
            <div
                className={`fixed top-0 left-0 z-50 flex h-full w-full justify-center bg-black/20 transition-all duration-150 ${
                    openModal
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                }`}
            >
                <div
                    className={`mt-15 h-fit w-170 space-y-2 rounded-3xl border border-gray-300 bg-gray-100 p-1 shadow transition-all duration-150 ease-out ${
                        openModal ? 'scale-100' : 'scale-95'
                    }`}
                >
                    <div className="space-y-2 rounded-[20px] bg-white p-4 shadow">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}