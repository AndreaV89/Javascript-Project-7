import React, { Component } from 'react';

class SearchForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const searchTerm = this.query.value;
        const path = `../search/${searchTerm}`;
        window.history.pushState({ urlPath: path }, '', path);
        e.currentTarget.reset();
        this.props.onSearch(searchTerm);
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit} >
                <input type="search" 
                    onChange={this.onSearchChange}
                    name="search"
                    ref={(input) => this.query = input} 
                    placeholder="Search..." />
                <button type="submit" id="submit"><i className="material-icons icn-search">search</i></button>
            </form>  
        );
    }
}

export default SearchForm;