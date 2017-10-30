import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">
          Protocome
        </Link>
      </nav>
    );
  }
}

export default Header;
