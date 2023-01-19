import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userLogged: '',
    requesting: false,
  }

  componentDidMount = async () => {
    this.setState({ requesting: true }, async () => {
      const currentUser = await getUser();
      this.setState({
        userLogged: currentUser.name,
        requesting: false,
      });
    });
  }

  render() {
    const { userLogged, requesting } = this.state;
    return (
      <header data-testid="header-component">
        Header
        {requesting ? <Loading /> : (
          <p data-testid="header-user-name">{ userLogged }</p>
        )}
        <nav>
          <ul>
            <li>
              <Link
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
