import React from 'react'
import './anime_image.css';

function AnimeImage(props:any) {

    return (
        <div className = "anime_image">
            <img className = "anime_img" alt = "anime_img" src = { props.image } />
        </div>
    )

}

export default AnimeImage