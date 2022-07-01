import React from 'react'
import './animenavbar.css'
import { Link, BrowserRouter as Router, Routes, Route} from "react-router-dom"

const AnimeNavbar = (props:any) => {
    return (
        <div className = "anime_navbar">
            <div className = "navbar_item">
                <Link to = { props.active }>Summary</Link>
            </div>
            <div className = "navbar_item">
                <Link to = { props.active + "/episodes" }>Episodes</Link>
            </div>
            <div className = "navbar_item">
                <Link to = { props.active + "/characters" }>Characters</Link>
            </div>
            <div className = "navbar_item">
                <Link to = { props.active + "/reactions" }>Reactions</Link>
            </div>
        </div>
    )
}

export default AnimeNavbar