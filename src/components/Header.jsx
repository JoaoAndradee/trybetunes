import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingText from './LoadingText';

class Header extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{`Olá ${name}`}</p>
        { loading && <LoadingText /> }
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
      </header>
    );
  }
}

export default Header;
