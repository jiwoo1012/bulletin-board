import React, { useState } from 'react'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'

import styles from './PostForm.module.scss'

const PostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const user = useAuthStore((state) => state.user)
    const addPost = usePostStore((state) => state.addPost)
    const loading = usePostStore((state) => state.loading)

    // 입력 값을 확인 후 새 게시글 데이터를 전송한다. (등록)
    const submitB = async () => {
        // 로그인 체크
        if(!user){
            alert('로그인 후 사용해주세요')
            return
        }

        // error 체크
        if(title.trim() === '' || content.trim() === ''){
            alert('제목과 내용을 입력해주세요')
            return
        }

        try{
            // 등록
            const newPost = {
                title: title,
                writer: user.email,
                content: content,
                uid: user.uid
            }

            // 게시글 추가
            await addPost(newPost)

            // 등록 후 입력 칸은 비워준다.
            setTitle('')
            setContent('')
        }catch(error){
            alert(error.message)
        }
    }

  return (
    <div>
       <div className={styles.formBox}>
       <h3>글쓰기</h3>
       <input className={styles.input} type='text' placeholder='제목을 입력하세요.' value={title}
         onChange={ (e)=>{
            setTitle(e.target.value)
         }} />
        <input className={styles.input} type="text" value={user?.email || ''} readOnly />
         <textarea className={styles.textarea} placeholder='글 내용을 입력하세요.' value={content}
         onChange={ (e)=>{
            setContent(e.target.value)
         }} />
        <button className={styles.submitBtn} onClick={submitB} disabled={loading}>
            {loading ? '등록중' : '등록'}
        </button>
    </div>
    </div>
  )
}

export default PostForm