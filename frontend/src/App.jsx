import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'
import MyPage from 'MyPage.jsx'

function App() {
  const [count, setCount] = useState(0)


//테스트용 코드
  useEffect(()=>{
      fetch("http://localhost:8080/api/ping")
  .then(res => res.text())
  .then(console.log);
  }, []);
//

  return (
        <MyPage/>
    )
}

export default App
