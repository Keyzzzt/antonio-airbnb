'use client'
import { styles } from './NavbarStyles'
import { Container } from '../MultiPurpose/Container/Container'
import { Logo } from './Logo/Logo'
import { Search } from './Search/Search'
import { UserMenu } from './UserMenu/UserMenu'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.div}>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

