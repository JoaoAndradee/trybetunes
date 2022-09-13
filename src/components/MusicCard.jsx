import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { name, previewMusic } = this.props;
    return (
      <div>
        <h3>{name}</h3>
        <p>{previewMusic}</p>
        <audio data-testid="audio-component" src="{previewMusic}" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
  previewMusic: PropTypes.string,
}.isRequired;

export default MusicCard;
