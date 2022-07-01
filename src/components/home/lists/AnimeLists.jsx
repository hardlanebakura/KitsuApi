import React, { Component } from 'react'
import './animelists.css'
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Card from '../../card/Card';

const images = new Array(5).fill("1");
console.log(images);

class AnimeLists extends Component {
    constructor(props) {
        super(props);
        this.state = { "tags": []};
    }

    componentDidMount() {
    this.getAnimes();
    console.log(document.getElementsByClassName("top__animes"));

    }

    getAnimes() {
    axios.get("http://localhost:5000/tags")
    .then(response => { this.setState({ tags: response.data }) })
    .catch(error => console.error(error));
    };

    getRows(item) {

        const animes = this.state.tags[item];
        if (animes !== undefined)
        return <div className = "row">
                { images.map((image, index) => <Card data = { animes[index] } />) }
                </div>

    }

    render() {
    return (
    <div className = "lists">
        <h3>Explore Anime</h3>
        <div className = "trending__animes">
            <div className = "anime__lists__title">
                <h6>Trending Animes</h6>
                { this.getRows("trending") }
            </div>
            <div className = "animes__row"></div>
        </div>
        <div className = "top__animes">
            <div className = "anime__lists__title">
                <h6>Top Animes</h6>
                { this.getRows("top") }
            </div>
            <div className = "animes__row"></div>
        </div>
        <div className = "highest__rating__animes">
            <div className = "anime__lists__title">
                <h6>Highest Rating Animes</h6>
                { this.getRows("highest rating") }
            </div>
            <div className = "animes__row"></div>
        </div>
        <div className = "most__popular__animes">
            <div className = "anime__lists__title">
                <h6>Most Popular Animes</h6>
                { this.getRows("most popular") }
            </div>
            <div className = "animes__row"></div>
        </div>
    </div>
    )
    }
}

export default AnimeLists