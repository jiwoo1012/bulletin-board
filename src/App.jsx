import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Board from './pages/Board'
import Detail from './pages/Detail'
import Counter from './count/Counter'
import ResetCounter from './count/ResetCounter'
import './App.scss'
import AuthForm from './components/AuthForm'
import useAuthStore from './store/authStore'

const App = () => {
  // const location = useLocation()
  // const isDetailPage = location.pathname.startsWith('/detail')
  const user=useAuthStore((state)=>state.user)
  const initialized=useAuthStore((state)=>state.initialized)
  const listenAuthState=useAuthStore((state)=>state.listenAuthState)
  const signOut=useAuthStore((state)=>state.signOut)

  useEffect(()=>{
    const unsubscribe=listenAuthState()

    // firebase 실시간 감지를 정리(새롭게 시작하기 위함)
    return unsubscribe
  },[listenAuthState])

  return (
    <div>
      <header>
        { initialized ? (
            <AuthForm/>
        ):(<p>로그인 상태 확인 중</p>)}
      </header>
      
      <Routes>
         <Route path='/' element={ <Board />} />
         <Route path='/detail/:id' element={ <Detail />} />
      </Routes>
    </div>
  )
}

export default App

// react 배열 데이터를 활용하여 게시판을 만듦.
// CRUD 기능을 구현
// Create: 생성(글쓰기)
// Read: 읽기(글 목록 상세 보기)
// Update: 수정(글 수정)
// Delete: 삭제(글 삭제)


// 게시글 하나는 객체로 만든다.
// { id: 1, title: "첫 번째 글", writer: "이수호", content: "지금 첫 번째 글을 작성 중입니다." }

// 게시글 목록은 배열로 만든다.
// [
//    { id: 1, title: "첫 번째 글", writer: "이수호", content: "지금 첫 번째 글을 작성 중입니다." }
//    { id: 2, title: "두 번째 글", writer: "김지우", content: "지금 두 번째 글을 작성 중입니다." }
// ]