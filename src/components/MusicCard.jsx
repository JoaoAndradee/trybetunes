import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingText from './LoadingText';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const { name, previewMusic, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <h3>{name}</h3>
        <p>{previewMusic}</p>
        <audio data-testid="audio-component" src="{previewMusic}" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            onClick={ () => {
              this.setState({
                loading: true,
              }, async () => {
                const teste = await getMusics();
                await teste.forEach((item) => addSong(item));
                getFavoriteSongs();
                this.setState({
                  loading: false,
                });
              });
            } }
          />
        </label>
        {loading && <LoadingText /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
  previewMusic: PropTypes.string,
  trackId: PropTypes.string,
  hasChecked: PropTypes.bool,
}.isRequired;

export default MusicCard;
