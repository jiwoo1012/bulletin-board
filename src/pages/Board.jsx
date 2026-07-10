import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

import styles from './Board.module.scss'

const Board = () => {
  return (
    <main className={styles.wrap}>
        <h2>React CRUD 게시판</h2>

        <div className={styles.boardContent}>
          <PostForm />
          <PostList />
        </div>
    </main>
  )
}

export default Board