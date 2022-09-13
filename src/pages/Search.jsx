import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    inputValue: '',
    releaseBtn: true,
  };

  handleChange = ({ target }) => {
    const { inputValue } = this.state;
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (inputValue.length >= 1) {
        this.setState({
          releaseBtn: false,
        });
      }
    });
  };

  render() {
    const { releaseBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          type="text"
          name="inputValue"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <input
          type="button"
          value="Pesquisar"
          data-testid="search-artist-button"
          disabled={ releaseBtn }
        />
      </div>
    );
  }
}

export default Search;
