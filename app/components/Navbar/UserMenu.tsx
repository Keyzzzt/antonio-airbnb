'use client'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../MultiPurpose/Avatar'
import { MenuItem } from './MenuItem'
import { useRegisterModal } from '@/app/helpers/hooks/useRegisterModal'
import { useLoginModal } from '@/app/helpers/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRentModal } from '@/app/helpers/hooks/useRentModal'
import { useRouter } from 'next/navigation'

type UserMenuProps = {
  currentUser?: SafeUser | null
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const router = useRouter()

  const [isOpen, setIsOpen] = React.useState(false)

  const toggleUserMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neural-100 transition cursor-pointer'
        >
          Your menu
        </div>
        <div
          onClick={toggleUserMenu}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar imageSrc={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label='My favorites'
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My property reservations'
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label='My properties'
                />
                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
                <MenuItem onClick={() => signOut()} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign Up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
