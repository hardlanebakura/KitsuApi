import React, { Component } from 'react'
import './anime_additional_info.css'
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';

class AnimeAdditionalInfo extends Component {

    constructor(props) {

        super(props);

    }

    getGenres(d) {

        console.log(d);
        var animeGenres = $("#anime__genres");
        if ($(animeGenres).text() === "") {
        $(d.genres).each((index, genre) => { console.log(genre); animeGenres.append(`<div class = 'anime__genre'>${genre}</div>`) } )
        var animeDetailsRows = $(".anime_details_row");
        $(animeDetailsRows).each((index, row) => {

            (index === 0) ? row.children[1].innerText = d.title : (index === 3) ? row.children[1].innerText = d.episodes.length : (index === 5) ? row.children[1].innerText = d.startDate + " - " + d.endDate.split("-")[0] : console.log("1");

        })
        }

    }

    getActive() {

        const navbarItems = $(".navbar_item");
        const navbarPages = [undefined, "episodes", "characters", "reactions"];
        console.log(window.location.pathname.split("/")[3]);
        $(navbarPages).each((index, navbarPage) => { $(navbarItems[index]).removeClass("active"); if (window.location.pathname.split("/")[3] === navbarPage) $(navbarItems[index]).addClass("active") })

    }

    render() {
        const d = this.props.data;
    return (
        <div className = "anime__additional-info">
            <div id = "anime__title-and-year">
                <div id = "anime__title">
                    { d.title }
                </div>
                <div id = "anime__year">
                    { d.startDate }
                </div>
            </div>
            <div id = "anime__genres">
                { this.getGenres(d) }
            </div>
            <div id = "anime__rankings">
                <div id = "anime__popularity">
                    <div className = "heart-shape" />
                    <div id = "popularity_value">
                        Rank #{ d.popularityRank } (Most Popular Anime)
                    </div>
                </div>
                <div id = "anime__rating">
                    <img id = "rating-img" alt = "asd" src = {require('../../images/star.png')} />
                    <div id = "rating_value">
                        Rank #{ d.ratingRank } (Highest Rated Anime)
                    </div>
                </div>
            </div>
            <div id = "anime_synopsis">
                { d.synopsis }
                { this.getActive() }
            </div>  
        </div>
    )
    }
}

export const withRouter = (AnimeAdditionalInfo) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <AnimeAdditionalInfo {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(AnimeAdditionalInfo);