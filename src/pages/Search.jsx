import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    artistSearch: '',
    btnDisabled: true,
    loading: false,
    albuns: [],
  }

  handleChange = ({ target }) => {
    this.setState({ artist: target.value }, () => {
      const { artist } = this.state;
      const minLength = 2;
      const disable = artist.length < minLength;
      this.setState({ btnDisabled: disable });
    });
  }

  searchAlbuns = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ loading: true });
    const albunsFetched = await searchAlbumsAPI(artist);
    this.setState({
      artistSearch: artist,
      artist: '',
      loading: false,
      albuns: albunsFetched,
      btnDisabled: true,
      render: true,
    });
  }

  render() {
    const { artist, btnDisabled, loading, render, albuns, artistSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                name="search-artist"
                id="search-artist-input"
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                value={ artist }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              disabled={ btnDisabled }
              data-testid="search-artist-button"
              onClick={ this.searchAlbuns }
            >
              Pesquisar
            </button>
          </div>
        ) }
        { render && (
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              { artistSearch }
            </h2>
            {albuns.length > 0 ? (
              <div>
                {albuns.map((album) => (
                  <div key={ album.collectionId }>
                    <div>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt={ album.collectionName }
                        />
                      </Link>
                    </div>
                    <div>
                      <p>{ album.collectionName }</p>
                      <p>{ album.artistName }</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>Nenhum álbum foi encontrado</h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
