import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './../components/Header';
import ProtocolList from './ProtocolList';
import ProtocolItem from './ProtocolItem';

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      item: {},
      page: 1
    }
  }

  componentDidMount() {
    this.onSearch('');
  }

  onSearch(query) {
    let url = 'http://protocome-proof-api.herokuapp.com/protocols';
    if (query) url += `?q=${query}`;

    axios.get(url).then(response => this.setState({ items: response.data }));
  }

  onItemSelect = (item) => {
    this.setState({ item });
    this.props.history.push({
      pathname: `/${item.id}`
    });
  }

  render() {
    return (
      <div>
        <Header onSubmit={this.onSearch.bind(this)}/>

        <div className="row justify-content-center p-4 bg-light">
          <div className="col col-lg-7">
            <Route path="/"  render={() => <ProtocolList items={this.state.items} onItemSelect={this.onItemSelect}/>} exact />
            <Route path="/:protocolId" render={(props) => <ProtocolItem item={this.state.item} />} />
          </div>

          <div className="col-lg-3">
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
