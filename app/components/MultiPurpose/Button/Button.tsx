'use client'
import { FC } from 'react'
import { ButtonProps } from './ButtonProps'
import { styles } from './ButtonStyles'

export const Button: FC<ButtonProps> = ({
    label,
    outline,
    small,
    disabled,
    onClick,
    icon: Icon
}) => {

    const concatenatedStyles = `${styles.button} ${outline
        ? 'bg-white border-black text-black border-[1px]'
        : 'bg-black border-black text-white'} ${small
        ? 'py-1 text-sm font-light ' 
        : 'py-3 text-md font-semibold'}`
        
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={concatenatedStyles}>
            {Icon && (
                <Icon size={24} className={styles.buttonIcon}/>
            )}
            {label}
        </button>
        
    )
}

