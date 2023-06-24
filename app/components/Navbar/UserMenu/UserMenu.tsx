'use client'
import { useCallback, useState } from 'react'
import { styles } from './UserMenuStyles'
import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../../MultiPurpose/Avatar/Avatar'
import { MenuItem } from '../MenuItem/MenuItem'

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleUserMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  return (
    <div className={styles.userMenu}>
      <div className={styles.wrapper}>
        <div onClick={() => { }} className={styles.title}>
          Your menu
        </div>
        <div onClick={toggleUserMenu} className={styles.burger}>
          <AiOutlineMenu />
          <div className={styles.avatar}>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.userMenuBlock}>
          <div className={styles.menuItems}>
            <MenuItem onClick={() => {}} label='Login' />
            <MenuItem onClick={() => {}} label='Sign Up' />
          </div>
        </div>
      )}
    </div>
  )
}


