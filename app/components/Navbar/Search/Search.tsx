'use client'
import { styles } from './SearchStyles'
import { BiSearch } from 'react-icons/bi'

export const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.wrapper}>
        <div className={styles.anywhere}>Anywhere</div>
        <div className={styles.anyweek}>Any week</div>
        <div className={styles.addGuestsWrapper}>
            <div className={styles.addGuests}>Add Guests</div>
            <div className={styles.icon}>
                <BiSearch size={18}/>
            </div>
        </div>
      </div>
    </div>
  )
}


