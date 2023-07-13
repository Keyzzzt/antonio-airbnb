'use client'
import React from 'react'
import axios from 'axios'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRegisterModal } from '@/app/helpers/hooks/useRegisterModal'
import { useLoginModal } from '@/app/helpers/hooks/useLoginModal'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const LoginModal = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false)
      if (cb?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }
      if (cb?.error) {
        toast.error(cb.error)
      }
    })
  }

  const switchToRegisterModal = React.useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='password'
        required
      />
    </div>
  )

  const footer = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <div>First time using Markee?</div>
          <div
            onClick={switchToRegisterModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmitHandler)}
      body={body}
      footer={footer}
    />
  )
}
