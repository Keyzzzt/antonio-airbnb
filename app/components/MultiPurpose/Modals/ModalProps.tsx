export type ModalProps = {
    isOpen?: boolean
    title?: string
    actionLabel: string
    secondaryActionLabel?: string 
    disabled?: boolean
    onClose: () => void
    onSubmit: () => void
    secondaryAction?: () => void
    body?: React.ReactElement
    footer?: React.ReactElement
}