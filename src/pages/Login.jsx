import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class login extends Component {
  state = {
    name: '',
    btnDisabled: true,
    logged: 'notLogged',
  }

  handleChange = ({ target }) => {
    this.setState({ name: target.value }, () => {
      const { name } = this.state;
      const minLength = 3;
      const disable = name.length < minLength;
      this.setState({ btnDisabled: disable });
    });
  }

  saveUser = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ logged: 'logged' }, async () => {
      await createUser({ name });
      this.setState({ logged: 'complete' });
    });
  }

  render() {
    const { name, btnDisabled, logged } = this.state;
    return (
      <div data-testid="page-login">
        {logged === 'notLogged' ? (
          <div>
            <label htmlFor="name-input">
              Login
              <input
                type="text"
                name="name"
                id="name-input"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              disabled={ btnDisabled }
              onClick={ this.saveUser }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        ) : (
          <div>
            {logged === 'logged' ? (
              <Loading />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        ) }
      </div>
    );
  }
}

export default login;
