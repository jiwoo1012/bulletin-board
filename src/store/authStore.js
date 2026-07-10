import { create } from "zustand";
import {
    signOutWithFirebase, 
    signInWithEmail,
    signUpWithEmail,
    subscribeAuthState
} from "../service/firebaseAuth";
import { initializeApp } from "firebase/app";
// 로그인, 로그아웃, 회원가입은 자기가 정한 명령어가 있는데 그걸 가져다 쓰기 위한 첫 번째 작업임.
// 기능을 내보내서 들고 올 때 공유 파일에서 들고 오도록 하기 위해.

const mapUser=(user)=>{
    if(!user){
        return null
    }
    // 픽스가 되어 있는 것. 내 맘대로 가져갈 수 없음
    return{
        Uid:user.uid,
        email:user.email,
    }
}


// 공유 파일 만들기-> 자바스크립트에서 내보낸 걸 가져와서.
const useAuthStore=create((set)=>({
    user:null, // 비었다는 의미
    initialized:false,
    loading: false,
    error: '',

    // 로그인 실시간 상태 감지
    // 공유시키는 역할(firebaseAuth.js를 구체적으로 공유-> 컨포넌트에 가져오기 위함)
    listenAuthState: ()=>{
        return subscribeAuthState((user)=>{
            set({
                user: mapUser(user),
                initialized:true,
            })
        })
    },

    // 회원 가입
    signUp: async ({email, password})=>{
        set({loading:true, error:''})
        try{
            const user = await signUpWithEmail({email, password}) // 통신이 끝나고 다음 줄로 넘어가라(await)
            set({user: mapUser(user), loading:false})
        }catch(err){
            set({error:err.message, loading:false})
            throw err // throw:넘겨
        }
    },

    //로그인
    signIn:async({email, password})=>{
        set({loading:true, error:''})
        try{
            const user=await signInWithEmail({email, password})
            set({user: mapUser(user), loading:false})
        }catch(err){
            set({error:err.message, loading:false})
            throw err
        }
    },

    //로그아웃
    signOut:async()=>{
        await signOutWithFirebase()
        set({user:null, error:''})
    }
}))

export default useAuthStore