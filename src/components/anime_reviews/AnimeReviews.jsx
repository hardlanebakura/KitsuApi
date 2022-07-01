import React, { Component } from 'react'
import './anime_reviews.css'
import AnimeImage from '../anime_image/AnimeImage';
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import HtmlParser from 'react-html-parser';
const upArrow = require('../../images/up-arrow.png');

class Reviews extends Component {

    constructor(props) {
        super(props);
        this.state = { "data": {}, "reviews": []};
      }

    componentDidMount() {

        const id = this.props.params.id;
        this.getAnime(id);

    }

    getAnime(id) {
        fetch(`http://localhost:5000/animes/${id}`)
        .then(response => response.json())
        .then(response => { this.setState({ data: response, reviews: response.reviews }) })
        .catch(error => console.error(error));
    };

    getReviews(arr) {

        var c = "<div class = 'reviews'>";
        arr.sort((a, b) => { return b.likesCount - a.likesCount; })
        arr.map(element => {

            console.log(element);
            c += `<div class = 'review'>
            <div class = 'review__view-likes'>
                <img class = 'review__likes-img' alt = '' src = '' />
                <div class = 'review_likes_count'>
                    ${ element.likesCount }
                </div>
            </div>
                <div class = 'review__user'>
                    <div class = 'review__user-name'>
                        ${ element.user_name }
                    </div>
                    <div class = 'review__content'>
                        ${ element.content }
                    </div>
                </div>
            </div>`
            return element;

        })

        c += "</div>";
        return (
            <div>{ HtmlParser(c) }</div>
        )

    }

    getActive() {

        const navbarItems = $(".navbar_item");
        const navbarPages = ["", "episodes", "characters", "reactions"];
        $(navbarPages).each((index, navbarPage) => { $(navbarItems[index]).removeClass("active"); if (window.location.pathname.split("/")[3] === navbarPage) $(navbarItems[index]).addClass("active") })

    }

    render() {
    if (this.state.reviews.length !== 0) {
    console.log(this.state.reviews);
    this.state.reviews.sort((a, b) => { return b.likesCount - a.likesCount; })
    return (
        <div id = "anime_main">
            <AnimeImage image = { this.state.data.posterImage }/>
            <div className = 'reviews'>
                { this.state.reviews.map(review => 
                    <div className = 'review'>
                        <div className = 'review__view-likes'>
                            <img className = 'review__likes-img' alt = '' src = { upArrow } />
                            <div className = 'review_likes_count'>
                                { review.likesCount }
                            </div>
                        </div>
                        <div className = 'review__user'>
                            <div className = 'review__user-name'>
                                { review.user_name }
                            </div>
                            <div className = 'review__content'>
                                { review.content.replace(/<[^>]+>/g, '').split(".")[0] + "." }
                            </div>
                        </div>
                    </div>
                    ) }
            </div>
                { this.getActive() }
        </div>
    )
    }
}

}

export const withRouter = (Reviews) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <Reviews {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(Reviews);