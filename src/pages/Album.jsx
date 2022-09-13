import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    collection: '',
    musicList: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      artistName: album[0].artistName,
      collection: album[0].collectionName,
      musicList: [...album],
    });
  }

  render() {
    const { artistName, collection, musicList } = this.state;
    const meuArray = [];
    for (let index = 1; index < musicList.length; index += 1) {
      meuArray.push(musicList[index]);
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{`Nome: ${artistName}`}</p>
        <p data-testid="album-name">{`Album: ${collection}`}</p>
        { meuArray.map((item, index) => (
          <li key={ index }>
            <MusicCard
              name={ item.trackName }
              previewMusic={ item.previewUrl }
              trackId={ item.trackId }
            />
          </li>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
  params: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default Album;
