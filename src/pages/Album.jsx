import React, { Component } from 'react';
import propTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: [],
    loading: true,
  };

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      album,
      loading: false,
    });
  };

  render() {
    const { loading, album } = this.state;
    const songs = album.filter((_music, index) => index !== 0);

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                src={ album[0].artworkUrl100 }
                alt={ album[0].collectionName }
              />
              <div>
                <h2 data-testid="album-name">{ album[0].collectionName }</h2>
                <p data-testid="artist-name">{ album[0].artistName }</p>
              </div>
            </div>
            <div>
              {songs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  // trackName={ song.trackName }
                  // previewUrl={ song.previewUrl }
                  // trackId={ song.trackId }
                  song={ song }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
