'use client'
import { FC } from 'react'
import { ContainerProps } from './ContainerProps'
import { styles } from './ContainerStyles'


export const Container: FC<ContainerProps> = ({children}) => {

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

