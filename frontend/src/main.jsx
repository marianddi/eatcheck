import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./css/index.css";
import App from './App.jsx'
import RankingPage from './RankingPage.jsx'
import Homework from './homework.jsx'
import HomeworkRankingWrapper from './HomeworkRankingWrapper.jsx'
createRoot(document.getElementById('root')).render(

    <HomeworkRankingWrapper/>
    
)
