import React, { Component } from 'react'
import './anime_characters.css'
import AnimeImage from '../anime_image/AnimeImage';
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = { "data": {}, "characters": [] };
      }

    componentDidMount() {

        const id = this.props.params.id;
        this.getAnime(id);

    }

    getAnime(id) {
        fetch(`http://localhost:5000/animes/${id}`)
        .then(response => response.json())
        .then(response => { this.setState({ data: response, characters: response.characters }); })
        .catch(error => console.error(error));
    };

    getRows(arr) {

        const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

        var rows = (chunk(arr, 6));
        var c = "";
        for (let i = 0; i < rows.length; i++) {

            c += "<div class='character_row'>";

            for (let j = 0; j < rows[i].length; j++) {

                c += `<div class = 'character_row_character'>
                    <img class = "character_row_img" alt = "" src = ${ rows[i][j].image } />
                    <div class = "character_row_name"> 
                        ${ rows[i][j].canonicalName }
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
            <div id = "characters">
                { this.getRows(this.state.characters) }
                { this.getActive() }
            </div>
        </div>
    )
    }

}

export const withRouter = (Characters) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <Characters {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(Characters);
