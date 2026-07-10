import React, { useState } from 'react'
import useAuthStore from '../store/authStore'


const AuthForm = () => {
    // 회원 가입할 상태, 로그인할 상태
    const [mode, setMode]=useState('signIn')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    // const {signIn, signOut, loading}= useAuthStore() -> 이렇게 한 번에 들고오면 시스템 성능 저하(그래서 하나하나 들고 오도록.)
    const signIn=useAuthStore((state)=>state.signIn)
    const signUp=useAuthStore((state)=>state.signUp)
    const loading=useAuthStore((state)=>state.loading)
    const error=useAuthStore((state)=>state.error)

    //실제 firbase가 로그인 됐는지 안 됐는지 알려주는 signIn
    const isSignIn=mode === 'signIn'
    //관리하는 함수
    const submitAuth=async(e)=>{
        e.preventDefault()
        
        if(email.trim()===''||password.trim()===''){
            alert('이메일과 비밀번호를 입력해주세요.')
            return
        }

        //모든 전달은 try, catch로
        try{
            if(isSignIn){
                await signIn({email, password})
            }else{
                await signUp({email, password})
            }
        }catch(err){
            alert(err.message)
        }
    } 

  return (
    <div>
       <h2>{isSignIn ? '로그인':'회원 가입'}</h2>

       <form onSubmit={submitAuth}>
        {/* form: div와 동일, 안에 있는 친구를 한꺼번에 보내서 함수에게 넘겨줌. 함수가 실행될 때 흝어지지 않음. */}
        {/* 회원 가입, 로그인은 form을 에티켓으로 주로 사용함. */}
        <input type="email" placeholder='이메일을 입력하세요.' value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='비밀번호를 입력하세요.' value={password}
        onChange={(e)=>{setPassword(e.target.value)}} />
        <button type='submit' disabled={loading}>
            {loading ? "처리 중": isSignIn ? '로그인':'회원 가입'}
        </button>
       </form>
       <br /><br />
       <button onClick={()=>setMode(isSignIn ? 'signUp':'signIn')}>{isSignIn ? '회원 가입하기':'로그인하기'}</button>
    </div>
  )
}

export default AuthForm