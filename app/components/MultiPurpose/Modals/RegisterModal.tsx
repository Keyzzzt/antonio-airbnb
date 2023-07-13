'use client'
import React from 'react'
import axios from 'axios'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRegisterModal } from '@/app/helpers/hooks/useRegisterModal'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useLoginModal } from '@/app/helpers/hooks/useLoginModal'

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Success')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((err) => {
        toast.error(`Register request error: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const switchToLoginModal = React.useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Markee' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
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
          <div>Already have an account?</div>
          <div
            onClick={switchToLoginModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmitHandler)}
      body={body}
      footer={footer}
    />
  )
}
