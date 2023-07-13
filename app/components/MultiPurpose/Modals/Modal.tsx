'use client'
import React from 'react'
import { Button } from '../Button'
import { IoMdClose } from 'react-icons/io'

type ModalProps = {
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

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  secondaryAction,
  title,
  body,
  actionLabel,
  secondaryActionLabel,
  footer,
}) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  const handleClose = React.useCallback(() => {
    if (!disabled) {
      setShowModal(false)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }, [disabled, onClose])

  const handleSubmit = React.useCallback(() => {
    if (!disabled) {
      onSubmit()
    }
  }, [disabled, onSubmit])

  const handleSecondaryAction = React.useCallback(() => {
    if (!disabled && secondaryAction) {
      secondaryAction()
    }
  }, [disabled, secondaryAction])

  React.useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const concatenatedStyles = `h-full translate duration-300 ${
    showModal ? 'translate-y-0' : 'translate-y-full'
  } ${showModal ? ' opacity-100' : ' opacity-0'}`

  return (
    <>
      <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
          {/* CONTENT */}
          <div className={concatenatedStyles}>
            <div className='relative flex flex-col w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg  translate bg-white outline-none focus:outline-none'>
              <header className='relative flex items-center justify-center p-6 rounded-t border-b-[1px]'>
                <button
                  onClick={handleClose}
                  className='absolute left-9 p-1 border-0 hover:opacity-70 transition'
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>{title}</div>
              </header>
              <div className='relative flex-auto p-6'>{body}</div>
              <footer className='flex flex-col gap-2 p-6'>
                <div className='flex flex-row items-center w-full gap-4'>
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
                {footer}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
