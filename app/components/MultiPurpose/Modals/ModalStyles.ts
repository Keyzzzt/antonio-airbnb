export const styles = {
    modal: 'flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70',
    modalWrapper: 'relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto',
    modalContent: 'h-full translate duration-300',
    any:'relative flex flex-col w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg  translate bg-white outline-none focus:outline-none',
    modalHeader: 'relative flex items-center justify-center p-6 rounded-t border-b-[1px]',
    closeBtn: 'absolute left-9 p-1 border-0 hover:opacity-70 transition',
    modalTitle: 'text-lg font-semibold',
    modalBody: 'relative flex-auto p-6',
    modalFooter: 'flex flex-col gap-2 p-6',
    modalFooterBody: 'flex flex-row items-center w-full gap-4',
}