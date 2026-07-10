import React from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '..//store/postStore'

import styles from './PostList.module.scss'

const PostList = () => {
    const posts = usePostStore( (state) => state.posts )
    const deletePost = usePostStore( (state) => state.deletePost )

    
  return (
    <section className={styles.listBox}>
       <h3>게시판 목록</h3>
       {
          posts.length === 0 ? (<p className={styles.empty}>등록된 게시글이 없습니다</p>) : (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map( (item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{posts.length - index}</td>
                                    <td className={styles.titleCell}><Link to={`/detail/${item.id}`}>{item.title}</Link></td>
                                    <td>{item.writer}</td>
                                    <td className={styles.actionCell}>
                                        <Link className={styles.editLink} to={`/detail/${item.id}`}>수정</Link>
                                        <button className={styles.deleteBtn} onClick={() =>{ deletePost(item.id)}}>삭제</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
          )
       }
    </section>
  )
}

export default PostList
