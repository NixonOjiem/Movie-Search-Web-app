import React, { Component } from 'react';
import axios from 'axios';
import picture from '../images/MoviePoster.jpg'

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchQuery: event.target.value });
  }

  fetchMovies() {
    const API_KEY = 'f7171ed0damsh435a225b94967c1p1e2eb6jsn57f2abe28f90';
    const API_HOST = 'mdblist.p.rapidapi.com';
    const API_PATH = '/';

    axios.get(`https://${API_HOST}${API_PATH}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
      params: {
        s: this.state.searchQuery,
        m: '',
      },
    })
      .then((response) => {
        const data = response.data;
        if (data) {
          if (data.search) {
            this.setState({ movies: data.search });
          } else {
            console.error('Unexpected API response data structure');
            this.setState({ movies: [] });
          }
        } else {
          this.setState({ movies: [] });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Movies & TVs Guide app</h1>
        <div className='Image-Holder'>
          <img src={picture} className='image' />
        </div>
        <input
          type="text"
          placeholder="Search for a movie or TV show"
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        /> <br />
        <div className="buttonHolder"><button onClick={this.fetchMovies} className="myButton">Search</button></div>
        <ol>
          {this.state.movies.map((movie) => (
            <li key={movie.id}>
              <b>Title:</b> {movie.title} <br />
              <b>Release Year:</b> ({movie.year}) <br />
              <b>Type:</b> {movie.type} <br />
              <b>Rating:</b> {movie.score}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default MovieSearch;