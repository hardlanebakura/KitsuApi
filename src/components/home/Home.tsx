import React from 'react'
import './home.css'
import AnimeCategories from './categories/AnimeCategories'
import AnimeLists from './lists/AnimeLists'

const Home = () => {
  return (
    <div className = "row">
        <AnimeLists />
        <AnimeCategories />
    </div>
  )
}

export default Home