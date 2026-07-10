import React, { useState } from 'react'
import useAuthStore from '../store/authStore'

import styles from './AuthForm.module.scss'

const AuthForm = () => {
    const [mode, setMode]=useState('signIn')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const signIn=useAuthStore((state)=>state.signIn)
    const signUp=useAuthStore((state)=>state.signUp)
    const signOut=useAuthStore((state)=>state.signOut)
    const user=useAuthStore((state)=>state.user)
    const loading=useAuthStore((state)=>state.loading)
    const error=useAuthStore((state)=>state.error)

    const isSignIn=mode === 'signIn'

    const submitAuth=async(e)=>{
        e.preventDefault()
        
        if(email.trim()===''||password.trim()===''){
            alert('이메일과 비밀번호를 입력해주세요.')
            return
        }

        try{
            if(isSignIn){
                await signIn({email, password})
            }else{
                await signUp({email, password})
            }
            setEmail('')
            setPassword('')
        }catch(err){
            alert(err.message)
        }
    } 

  // 로그인 된 상태면 이메일 + 로그아웃 버튼만 보여주기
  if(user){
    return (
        <div className={styles.gnb}>
            <span className={styles.userEmail}>{user.email}</span>
            <button className={styles.logoutBtn} onClick={signOut}>로그아웃</button>
        </div>
    )
  }

  return (
    <div className={styles.gnb}>
       <form className={styles.form} onSubmit={submitAuth}>
            <input className={styles.input} type="email" placeholder='이메일' value={email} 
            onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className={styles.input} type="password" placeholder='비밀번호' value={password}
            onChange={(e)=>{setPassword(e.target.value)}} />
            <button className={styles.submitBtn} type='submit' disabled={loading}>
                {loading ? "처리 중": isSignIn ? '로그인':'회원 가입'}
            </button>
            <button type='button' className={styles.switchBtn} onClick={()=>setMode(isSignIn ? 'signUp':'signIn')}>
                {isSignIn ? '회원가입':'로그인으로'}
            </button>
       </form>
       {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}

export default AuthForm