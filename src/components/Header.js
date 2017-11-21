import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  onChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Protocome
          </Link>

          <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={this.onChange.bind(this)}/>
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
