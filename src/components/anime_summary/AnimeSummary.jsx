import React, { Component } from 'react'
import './anime_summary.css'
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';
import AnimeImage from '../anime_image/AnimeImage';
import AnimeAdditionalInfo from '../anime_additional_info/AnimeAdditionalInfo';
import AnimeDetails from '../anime_details/AnimeDetails';

class AnimeSummary extends Component {

    constructor(props) {
        super(props);
        this.state = { "data": {}};
      }

    componentDidMount() {

        const id = this.props.params.id;
        this.getAnime(id);

    }

    getAnime(id) {
        fetch(`http://localhost:5000/animes/${id}`)
        .then(response => response.json())
        .then(response => { response.startDate = response.startDate.split("-")[0]; this.setState({ data: response}); })
        .catch(error => console.error(error));
    };

    getGenres() {

        var animeGenres = $("#anime_genres");
        if ($(animeGenres).text() === "")
        $(this.state.data.genres).each((index, genre) => animeGenres.append(`<div>${genre}</div>`) )

    }

    getActive() {

        const navbarItems = $(".navbar_item");
        const navbarPages = [undefined, "episodes", "characters", "reactions"];
        console.log(window.location.pathname.split("/")[3]);
        $(navbarPages).each((index, navbarPage) => { $(navbarItems[index]).removeClass("active"); if (window.location.pathname.split("/")[3] === navbarPage) $(navbarItems[index]).addClass("active") })

    }

    render() {
    return (
        <div id = "anime_main">
            <AnimeImage image = { this.state.data.posterImage }/>
            <AnimeAdditionalInfo data = { this.state.data } />
            <AnimeDetails data = { this.state.data } />
        </div>
    )
    }

}

export const withRouter = (AnimeSummary) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <AnimeSummary {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(AnimeSummary);