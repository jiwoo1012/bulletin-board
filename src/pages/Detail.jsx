import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePostStore from '../store/postStore'

import styles from './Detail.module.scss'

const Detail = () => { 
   const { id } = useParams()
   const posts = usePostStore( (state) => state.posts)
   const updatePost = usePostStore( (state) => state.updatePost)
   
   const post = posts.find((item)=>{
            return item.id === Number(id)
   })

   const [isEdit, setIsEdit] = useState(false)
   const [title, setTitle] = useState( post ? post.title : '' )
   const [writer, setWriter] = useState( post ? post.writer : '' )
   const [content, setContent] = useState( post ? post.content : '' )

   const updatefunc = () => {
        if(title.trim() === '' || writer.trim() === '' || content.trim() === ''){
            alert('모든 내용을 다 입력하셔야 합니다')
            return
        }

        updatePost({
          id : post.id,
          title : title,
          writer : writer,
          content : content
        })

        setIsEdit(false)
   }

   if(!post){
     return (
        <div className={styles.wrap}>
            <h2>게시글이 없습니다</h2>
            <Link className={styles.listLink} to='/'>목록으로</Link>
        </div>
     )
   }

   
  return (
    <div className={styles.bg}>
    <div className={styles.wrap}>
        <h2>게시글 상세보기</h2>

        {
            isEdit ? (
                <div className={styles.card}>
                  <p className={styles.row}> <strong>번호</strong> {post.id}</p>
                  <input className={styles.input} type='text' value={title} 
                  onChange={(e)=>{
                      setTitle(e.target.value)} }
                   />
                  <input className={styles.input} type='text' value={writer} 
                  onChange={(e)=>{
                      setWriter(e.target.value)} }
                   />
                  <textarea className={styles.textarea} value={content} 
                  onChange={(e)=>{
                      setContent(e.target.value)} }
                   />

                   <div className={styles.btnRow}>
                     <button className={styles.saveBtn} onClick={updatefunc}>저장</button>
                     <button className={styles.cancelBtn} onClick={
                        () => {
                          setTitle(post.title)
                          setWriter(post.writer)
                          setContent(post.content)
                          setIsEdit(false)
                        }
                     }>취소</button>
                   </div>
                </div>
            ) : (
                <div className={styles.card}>
                   <p className={styles.row}><strong>번호</strong> {post.id}</p>
                   <p className={styles.row}><strong>제목</strong> {post.title}</p>
                   <p className={styles.row}><strong>작성자</strong> {post.writer}</p>
                   <p className={styles.row}><strong>내용</strong></p>
                   <div className={styles.contentBox}>{post.content}</div>

                    <div className={styles.btnRow}>
                      <button className={styles.editBtn} onClick={ () =>{
                          setIsEdit(true)
                      }}>수정</button>
                      <Link className={styles.listLink} to='/'>목록으로</Link>
                    </div>
                </div>
            )
        }
    </div>
    </div>
  )
}

export default Detail