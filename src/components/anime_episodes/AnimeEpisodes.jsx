import React, { Component } from 'react'
import './anime_episodes.css'
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import AnimeImage from '../anime_image/AnimeImage';

class Episodes extends Component {
    constructor(props) {
        super(props);
        this.state = { "data": {}, "episodes": []};
      }

    componentDidMount() {

        const id = this.props.params.id;
        this.getAnime(id);

    }

    getAnime(id) {
        fetch(`http://localhost:5000/animes/${id}`)
        .then(response => response.json())
        .then(response => { this.setState({ data: response, episodes: response.episodes }); })
        .catch(error => console.error(error));
    };

    getEpisodes(arr) {

        const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

        var rows = (chunk(arr, 3));
        var c = "";
        for (let i = 0; i < rows.length; i++) {

            c += "<div class='episode_row'>";

            for (let j = 0; j < rows[i].length; j++) {

                console.log(rows[i][j]);
                c += `<div class = 'episode'>
                    <img class = "episode_img" alt = "" src = ${ rows[i][j].thumbnail } />
                    <div class = "episode_name"> 
                        ${ rows[i][j].title }
                    </div>
                </div>`;

            }

            c += "</div>";

        }

        return ( 

            <div>
                { ReactHtmlParser(c) }
            </div>

         )

    }

    getActive() {

        const navbarItems = $(".navbar_item");
        const navbarPages = ["", "episodes", "characters", "reactions"];
        $(navbarPages).each((index, navbarPage) => { $(navbarItems[index]).removeClass("active"); if (window.location.pathname.split("/")[3] === navbarPage) $(navbarItems[index]).addClass("active") })

    }

    render() {
    return (
        <div id = "anime_main">
        <AnimeImage image = { this.state.data.posterImage }/>
        <div id = "episodes">
            { this.getEpisodes( this.state.episodes ) }
        </div>
        { this.getActive() }
        </div>
    )
    }
}

export const withRouter = (Episodes) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <Episodes {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(Episodes);