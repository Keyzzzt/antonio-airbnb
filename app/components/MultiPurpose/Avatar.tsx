'use client'
import Image from 'next/image'

type AvatarProps = {
  imageSrc: string | null | undefined
}

export const Avatar: React.FC<AvatarProps> = ({ imageSrc }) => {
  return (
    <Image
      alt='avatar'
      className='rounded-full'
      height='30'
      width='30'
      src={imageSrc || '/images/avatar.png'}
    />
  )
}
