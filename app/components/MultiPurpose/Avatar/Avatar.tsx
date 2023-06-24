'use client'
import Image from 'next/image'
import { styles } from './AvatarStyles'

export const Avatar = () => {
  return (
    <Image
    alt='avatar'
    className={styles.avatar}
    height='30'
    width='30'
    src='/images/avatar.png'
     />
  )
}


