import React, { Component } from 'react';
import data from './../data/protocols.json';
import Header from './../components/Header';
import ProtocolShortItem from './../components/ProtocolShortItem';

class ProtocolList extends Component {
  constructor(props) {
      super(props);

      this.state = {
        items: []
      }
  }

  componentDidMount() {
    const attrs = ['id', 'title', 'abstract', 'materials_and_methods', 'journal'];
    const items = data.response.docs.filter((protocol) =>
      Object.keys(protocol).length >= attrs.length
    );

    this.setState({ items: items });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="row justify-content-center p-4 bg-light">
          <div className="col col-lg-7">
            {this.state.items.map((item, index) => <ProtocolShortItem item={item} key={index} />)}
          </div>

          <div className="col-lg-3">
          </div>
        </div>
      </div>
    );
  }
}

export default ProtocolList;
