import React from 'react'
import useCouterStore from '../store/counterStore'

import styles from './Counter.module.scss'

const Counter = () => {
    const { count, increase, decrease } = useCouterStore()

  return (
    <div className={styles.wrap}>
       <h2 className={styles.count}>{count}</h2>
       <div className={styles.btnRow}>
         <button className={styles.btn} onClick={increase}>+</button>
         <button className={styles.btn} onClick={decrease}>-</button>
       </div>
    </div>
  )
}

export default Counter
