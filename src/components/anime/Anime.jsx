import React, { Component } from 'react'
import './anime.css'
import { Link, BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import AnimeNavbar from '../anime_navbar/AnimeNavbar';

class Anime extends Component {
    constructor(props) {
        super(props);
        this.state = { "data": {}, "active": "" };
    }
    
    componentDidMount() {
        const id = this.props.params.id;
        this.getAnime(id);
        const url = `/animes/${id}`;
        this.setState({ active:url })
    }

    getAnime(id) {
        fetch(`http://localhost:5000/animes/${id}`)
        .then(response => response.json())
        .then(response => { this.setState({ data: response}); })
        .catch(error => console.error(error));
    };

    render() {
        return <div className = "animes">
                    <div id = "anime_cover" style = {{ backgroundImage: `url(${ this.state.data.coverImage })` }} />
                    <AnimeNavbar active = { this.state.active }/>
                </div>;
    }
}

export const withRouter = (Anime) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
  
    return <Anime {...props} params={params} navigate={navigate} />;
  };

  export default withRouter(Anime);