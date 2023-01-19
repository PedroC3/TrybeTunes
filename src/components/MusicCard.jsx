import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({
      favoriteSongs: await getFavoriteSongs(),
    });
  }

  handleChangeFavSong = async ({ target }, song) => {
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        (await addSong(song));
      } else {
        (await removeSong(song));
      }
      this.setState({
        loading: false,
        favoriteSongs: await getFavoriteSongs(),
      });
    });
  }

  render() {
    const { song } = this.props;
    const { loading, favoriteSongs } = this.state;
    return (
      <div>
        { loading ? (
          <Loading />
        ) : (
          <div>
            <p>{ song.trackName }</p>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <div>
              <label htmlFor={ `checkbox-music-${song.trackId}` }>
                <input
                  type="checkbox"
                  id={ `checkbox-music-${song.trackId}` }
                  checked={
                    favoriteSongs.some((songInFav) => songInFav.trackId === song.trackId)
                  }
                  data-testid={ `checkbox-music-${song.trackId}` }
                  onChange={ (e) => this.handleChangeFavSong(e, song) }
                />
                Favorita
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired }).isRequired,
};

export default MusicCard;
