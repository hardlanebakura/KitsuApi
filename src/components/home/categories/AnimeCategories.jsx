import React, { Component, useState } from 'react'
import axios from 'axios';
import './animecategories.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import $ from 'jquery';

class AnimeCategories extends Component {

  constructor(props) {
    super(props);
    this.state = { "categories": []};
  }

  componentDidMount() {
    this.getAnime();
  }

  getAnime() {
    axios.get("http://localhost:5000/categories")
    .then(response => { this.setState({ categories: response.data }); })
    .catch(error => console.error(error));
  };

  getRows(arr) {

    const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

    var rows = (chunk(arr, 2));
    var c = "";
    for (let i = 0; i < rows.length; i++) {

      c += "<div class = 'categories_row'>";

      for (let j = 0; j < rows[i].length; j++) {

        c += `<div class = "category">
        ${ this.state.categories[i * 2 + j] }
        </div>`;

      }

      c += "</div>";

    }

    return ( ReactHtmlParser(c) )

  }

  styleRows() {

    if ($(".category") % 2 === 0) console.log("1");
    console.log($(".category"));

  }
    
  render() {
  return (
    <div className = "categories">
        <h5>Categories</h5>
        <p>Favoriting categories will improve your recommendations.</p>
        <h5>Categories</h5>
        <div className = "categories_list">
          { this.getRows(this.state.categories) }
        </div>
        { this.styleRows() }
    </div>
  )
  }
}

export default AnimeCategories