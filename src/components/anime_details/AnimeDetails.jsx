import React from 'react'
import './anime_details.css'

const AnimeDetails = (props) => {

    return (
        <div className = "anime_details">
            <h5>Anime Details</h5>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    English (American)
                </div>
                <div className = "anime_details_row_value">
                </div>
            </div>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    Japanese
                </div>
                <div className = "anime_details_row_value">
                </div>
            </div>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    Type
                </div>
                <div className = "anime_details_row_value">
                    TV
                </div>
            </div>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    Episodes
                </div>
                <div className = "anime_details_row_value">
                    
                </div>
            </div>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    Status
                </div>
                <div className = "anime_details_row_value">
                    Finished
                </div>
            </div>
            <div className = "anime_details_row">
                <div className = "anime_details_row_name">
                    Aired
                </div>
                <div className = "anime_details_row_value">
                    
                </div>
            </div>
        </div>
    )
    
}

export default AnimeDetails