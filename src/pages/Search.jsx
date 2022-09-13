import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingText from '../components/LoadingText';
import SearchAlbumAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputValue: '',
    releaseBtn: true,
    showInputs: true,
    showAlbuns: false,
    artistName: '',
    albunsList: [],
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

  searchAlbum = (artist) => {
    this.setState({
      inputValue: '',
      showInputs: false,
    }, async () => {
      const getAlbuns = await SearchAlbumAPI(artist);
      this.setState({
        showInputs: true,
        showAlbuns: true,
        artistName: artist,
        albunsList: [...getAlbuns],
      });
    });
  };

  render() {
    const {
      inputValue,
      releaseBtn,
      showInputs,
      showAlbuns,
      artistName,
      albunsList,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        { showInputs
          ? (
            <>
              <input
                type="text"
                name="inputValue"
                value={ inputValue }
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
              <input
                type="button"
                value="Pesquisar"
                data-testid="search-artist-button"
                disabled={ releaseBtn }
                onClick={ () => { this.searchAlbum(inputValue); } }
              />
            </>)
          : <LoadingText /> }
        { showAlbuns && <h2>{`Resultado de álbuns de: ${artistName} `}</h2> }
        { albunsList.map((item, index) => (
          <Link
            key={ index }
            to={ `/album/${item.collectionId}` }
            data-testid={ `link-to-album-${item.collectionId}` }
          >
            <li>{`Album: ${item.collectionName}`}</li>
          </Link>
        )) }
        { albunsList.length === 0 && <h2>Nenhum álbum foi encontrado</h2>}
      </div>
    );
  }
}

export default Search;
