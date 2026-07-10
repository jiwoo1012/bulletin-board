import { create } from 'zustand'
import {
  updatePostInFirestore,
  deletePostFromFirestore,
  addPostToFirestore,
  fetchPostsFromFirestore
} from '../service/FirestorePost'

const getPostErrorMessage = (error) =>{
  if(error.code === 'permission-denied'){
    return "게시글 목록을 읽을 권한이 없습니다 Firebase rules error"
  }

  return error.message
}

const usePostStore = create((set) => ({
  posts: [
    // { id: 2, title: '두 번째 글', writer: '관리자', content: '두 번째 글입니다' },
    // { id: 1, title: 'CRUD 게시 첫 번째 글', writer: '관리자', content: '상세보기, 수정, 삭제 기능이 있습니다' }
  ],
  loading : false,
  error: '',

  // 게시글 목록 최신순으로 가져오기
  fetchPosts : async() =>{
    set({loading : true, error: ''})

    try{
      const posts = await fetchPostsFromFirestore()
      set({posts, loading : false })
    }catch(error){
      set({ error : getPostErrorMessage(error), loading:false })
    }
  },

  addPost: async (newPost) => {
    set({ loading : true, error : '' })
      try{
          const apost = await addPostToFirestore(newPost)
          set((state) => ({
          posts : [apost, ...state.posts],
          loading : false,

        }))
      }catch(error){
        set({ error : getPostErrorMessage(error), loading:false })
        throw error
      }
      // set((state) => {
      //   const nextId =
      //     state.posts.length === 0
      //       ? 1
      //       : Math.max(...state.posts.map((item) => item.id)) + 1

      //   return {
      //     posts: [
      //       { ...newPost, id: nextId },
      //       ...state.posts
      //     ]
      //   }
      // })
  },

  // 게시글 삭제
  deletePost: async(id) => {
    set({ loading : true, error : '' })

    try{
      await deletePostFromFirestore(id)
      set((state) => ({
        posts : state.posts.filter((item) => item.id !== id),
        loading : false,
      }))
    }catch(error){
      set({ error : getPostErrorMessage(error), loading:false })
      throw error
    }

    // set((state) => {
    //   const filteredPosts = state.posts.filter((item) => item.id !== id)

    //   return {
    //     posts: filteredPosts.map((item, index) => ({
    //       ...item,
    //       id: filteredPosts.length - index
    //     }))
    //   }
    // })
  },

  updatePost: async (updatedPost) => {
    set({ loading : true, error : '' })
    try{
      const savePost = await updatePostInFirestore(updatedPost)
      set((state) => ({
        posts: state.posts.map((item)=>(item.id === savePost.id ? savePost : item)),
        loading : false,
      }))
    }catch(error){
      set({ error : getPostErrorMessage(error), loading:false })
      throw error
    }
    // set((state) => ({
    //   posts: state.posts.map((item) => {
    //     if (item.id === updatedPost.id) {
    //       return updatedPost
    //     }
    //     return item
    //   })
    // }))
  }
}))

export default usePostStore

/* 
 - zustand :: 전역(모든 컴포넌트) 상태(state)를 관리하는 라이브러리
 유사 라이브러리 ::
 - Redux Toolkit(RTK) : 대형 프로젝트에서에서 사용됨
                        단점: 학습하기 매우 어려움
 - Context API : 소형 프로젝트에서 사용됨

 하나의 컴퍼넌트 에서 상태관리
 const [count, setCount] = useState(0)
 setCount(10);
 <h1>{count}</h1>


 전체 컴퍼넌트 관리(zustand)
 초기 설정
 counst useStore = create( (set)=> ({
    count : 0,
    str :''
 }))

 값 수정
 set({
    count : 10,
    str :'안녕하세요'
 })

 값 사용
  const count = useStore( (state) => state.count )
  const str = useStore( (state) => state.str )

  <h1>{count}</h1>
  <h2>{str}</h2>
*/