import React from 'react'
import useCouterStore from '../store/counterStore'

const ResetCounter = () => {
   const { reset } = useCouterStore()

  return (
    <div>
        <h2>리셋합니다</h2>
        <br />
       <button onClick={reset}>리셋</button>
       <br /><br /><br /><br /><br />
    </div>
  )
}

export default ResetCounter
