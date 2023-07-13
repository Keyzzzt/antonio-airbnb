'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Heading } from './MultiPurpose/Heading'
import { Button } from './MultiPurpose/Button'

type EmptyStateProps = {
  title?: string
  subtitle?: string
  showReset?: boolean
}
export const EmptyState: React.FC<EmptyStateProps> = ({
  showReset,
  title = 'No exact matches',
  subtitle = 'Try changing or removing filters',
}) => {
  const router = useRouter()
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center backdrop-grayscale-0'>
      <Heading title={title} subtitle={subtitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}
