// Import React
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

// Import styles
import '../index.css';

// Import App Components
import Nav from './Nav';
import PhotoList from './PhotoList';
import SearchForm from './SearchForm';
import PageNotFound from './PageNotFound';

// Import ApiKey
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

  // As soon as the component is rendered the app perform a request
  componentDidMount() {
    this.handleSearch(this.state.query);
  }

  // Function to handle the search
  handleSearch = (query = 'sunset') => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false,
          query: query
        });
      }).catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.handleSearch} />
          <Nav onClick={this.handleSearch}/>
          <div className="photo-container">
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="search/sunsets" /> } />
              <Route path="/sunsets" render={ () => <PhotoList data={this.state.photos} title={this.state.query} loading={this.state.loading}/> } />
              <Route path="/waterfalls" render={ () => <PhotoList data={this.state.photos} title={this.state.query} loading={this.state.loading}/> } />
              <Route path="/rainbows" render={ () => <PhotoList data={this.state.photos} title={this.state.query} loading={this.state.loading}/> } />
              <Route path="/search/:searchTerm" render={ () => <PhotoList data={this.state.photos} title={this.state.query} loading={this.state.loading}/> } />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
