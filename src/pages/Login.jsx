import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingText from '../components/LoadingText';

class Login extends React.Component {
  state = {
    name: '',
    changeButton: () => {
      const { name } = this.state;
      const MIN_CHARACTER = 2;
      return name.length <= MIN_CHARACTER;
    },
    user: { name: '' },
    hasSubmit: false,
    redirect: false,
  };

  handleName = (event) => {
    this.setState({
      name: event.target.value,
      user: {
        name: event.target.value,
      },
    });
  };

  render() {
    const { changeButton, user, hasSubmit, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { redirect && <Redirect to="/search" /> }
        { hasSubmit
          ? <LoadingText />
          : (
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleName }
              />
              <input
                type="button"
                value="Entrar"
                data-testid="login-submit-button"
                disabled={ changeButton() }
                onClick={ () => {
                  this.setState({
                    hasSubmit: true,
                  }, async () => {
                    await createUser(user);
                    this.setState({
                      hasSubmit: false,
                      redirect: true,
                    });
                  });
                } }
              />
            </form>)}
      </div>
    );
  }
}

export default Login;
