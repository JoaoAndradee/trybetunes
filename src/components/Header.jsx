import React from 'react';
import { getUser } from '../services/userAPI';
import LoadingText from './LoadingText';

class Header extends React.Component {
  state = {
    // name: '',
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
      </header>
    );
  }
}

export default Header;
