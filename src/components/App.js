import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import Nav from './Nav';
import PhotoList from './PhotoList';
import SearchForm from './SearchForm';

import apiKey from '../config';
const APIKey = apiKey;

class App extends Component{

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
      query: 'sunset'
    }
  }

  componentDidMount() {
    this.handleSearch(this.state.query);
  }

  handleSearch = (query = 'sunset') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log(response.data.photos.photo);
        this.setState({
          photos: response.data.photos.photo,
          loading: false,
        });
      }).catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  setQuery = query => {
    console.log(this.state.query);
    this.setState({query});
    this.handleSearch(this.state.query)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.handleSearch} />
          <Nav onClick={this.setQuery}/>
          <div className="photo-container">
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="search/sunsets" /> } />
              <Route path="/sunsets" render={ () => <PhotoList data={this.state.photos} title={this.state.query}/> } />
              <Route path="/waterfalls" render={ () => <PhotoList data={this.state.photos} title={this.state.query}/> } />
              <Route path="/rainbows" render={ () => <PhotoList data={this.state.photos} title={this.state.query}/> } />
              <Route path="/search/:searchTerm" render={ () => <PhotoList data={this.state.photos} title={this.state.query}/> } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
