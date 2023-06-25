'use client'
import { FC, useEffect, useState, useCallback } from 'react'
import { ModalProps } from "./ModalProps"
import { styles } from './ModalStyles'
import { IoMdClose } from 'react-icons/io'
import { Button } from '../Button/Button'

export const Modal: FC<ModalProps> = ({
    isOpen,
    disabled,
    onClose,
    onSubmit,
    secondaryAction,
    title,
    body,
    actionLabel,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen)

    const handleClose = () => useCallback(() => {
        if (!disabled) {
            setShowModal(false)
            setTimeout(() => {
                onClose()
            }, 300)
        }
    }, [disabled, onClose])

    const handleSubmit = () => useCallback(() => {
        if (!disabled) {
            onSubmit()
        }
    }, [disabled, onSubmit])

    const handleSecondaryAction = () => useCallback(() => {
        if (!disabled && secondaryAction) {
            secondaryAction()
        }
    }, [disabled, secondaryAction])

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    if (!isOpen) {
        return null
    }

    const concatenatedStyles = `${styles.modalContent} ${showModal
        ? 'translate-y-0'
        : 'translate-y-full'} ${showModal
            ? ' opacity-100'
            : ' opacity-0'}`



    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalWrapper}>
                    {/* CONTENT */}
                    <div className={concatenatedStyles}>
                        <div className={styles.any}>
                            <header className={styles.modalHeader}>
                                <button onClick={handleClose} className={styles.closeBtn}>
                                    <IoMdClose size={18} />
                                </button>
                                <div className={styles.modalTitle}>{title}</div>
                            </header>
                            <div className={styles.modalBody}>{body}</div>
                            <footer className={styles.modalFooter}>
                                <div className={styles.modalFooterBody}>
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

