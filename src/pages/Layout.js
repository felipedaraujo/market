import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './../components/Header';
import ProtocolList from './ProtocolList';
import ProtocolItem from './ProtocolItem';

class Layout extends Component {
  constructor(props) {
    super(props);

    let url;

    if (process.env.NODE_ENV === 'production') {
      url = process.env.REACT_APP_API_URL_PROD;
    } else {
      url = process.env.REACT_APP_API_URL_DEV;
    }

    this.state = {
      items: [],
      item: {},
      page: 1,
      query: '',
      apiURL: url,
      hasMoreItems: false,
      loading: false
    }
  }

  componentDidMount() {
    this.onLoadItems();
  }

  onSearch(query) {
    this.setState({ items: [], query, page: 1 }, () => this.onLoadItems());
  }

  onLoadItems() {
    let url = this.state.apiURL;

    if (this.state.query) {
      url += `?q=${this.state.query}`;
    };

    this.setState({
      loading: true
    })

    axios.get(url, {
      params: {
        page: this.state.page
      }
    }).then(response => {

      this.setState({
        items: [...this.state.items, ...response.data] ,
        hasMoreItems: !!response.data.length,
        loading: false
      });
    });
  }

  onItemSelect = (item) => {
    this.setState({ item });
    this.props.history.push({
      pathname: `/${item.id}`
    });
  }

  onLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage }, () => this.onLoadItems());
  }

  render() {
    return (
      <div>
        <Header onSubmit={this.onSearch.bind(this)}/>

        <div className="row justify-content-center p-4 bg-light">
          <div className="col col-lg-7">
            <Route path="/"  render={() => <ProtocolList items={this.state.items} onItemSelect={this.onItemSelect} query={this.state.query} onLoadMore={this.onLoadMore} hasMoreItems={this.state.hasMoreItems} loading={this.state.loading} />} exact />
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
