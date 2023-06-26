'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { styles } from './LogoStyles'

export const Logo = () => {
    const router = useRouter()
  return (
    <Image 
    alt='logo'
    height='100'
    width='100'
    src='/images/logo.svg'
    className={styles.logo}
    />
  )
}
