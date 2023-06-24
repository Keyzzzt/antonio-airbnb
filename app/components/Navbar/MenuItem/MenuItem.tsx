'use client'
import { FC } from 'react'
import { styles } from './MenuItemStyles'
import { MenuItemProps } from './MenuItemProps'

export const MenuItem: FC<MenuItemProps> = ({onClick, label}) => {
  return (
    <div onClick={onClick} className={styles.menuItem}>{label}</div>
  )
}


