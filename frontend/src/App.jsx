import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Report from './Report.jsx'
import Login from './Login.jsx'
import Calendar from './Calendar.jsx'
import InputInfo from './InputInfo.jsx'
import EatCheckApp from './EatCheckApp.jsx'
import RankingPage from './RankingPage'

function App() {
  const [count, setCount] = useState(0)
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <>
      {currentScreen === 'login' && <Login onLogin={() => setCurrentScreen('main')} />}
      {currentScreen === 'main' && <Report />}
    </>
  )
}
export default App
