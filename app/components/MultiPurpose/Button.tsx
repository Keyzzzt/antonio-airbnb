'use client'
import { IconType } from 'react-icons'

type ButtonProps = {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

export const Button: React.FC<ButtonProps> = ({
  label,
  outline,
  small,
  disabled,
  onClick,
  icon: Icon,
}) => {
  const concatenatedStyles = `relative w-full disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition ${
    outline
      ? 'bg-white border-black text-black border-[1px]'
      : 'bg-black border-black text-white'
  } ${small ? 'py-1 text-sm font-light ' : 'py-3 text-md font-semibold'}`

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={concatenatedStyles}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  )
}
