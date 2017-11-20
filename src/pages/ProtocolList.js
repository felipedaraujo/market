import React, { Component } from 'react';
import styled from 'styled-components';
import Infinite from 'react-infinite';

const H4 = styled.h4`
  &.card-title {
    font-size: 1rem;
  }
`;

class ProtocolList extends Component {
  summary = (text, length) => {
    if (text.length < length) return text;
    return `${text.substring(0, length)}...`;
  }

  handleInfiniteLoad = () => {
    // https://github.com/seatgeek/react-infinite
  }

  renderList = () => {
    const { items } = this.props;

    if (items.length) {
      return items.map((item, index) => {
        return (
          <div className="card mb-3 border-0" key={index} onClick={() => this.props.onItemSelect(item)}>
            <div className="card-body" >
              <H4 className="card-title"><strong>{this.summary(item.title, 77)}</strong></H4>
              <p className="card-text">{this.summary(item.materials_and_methods, 197)}</p>
            </div>
          </div>
        );
      });
    } else {
      return (<p>Your search did not match any documents.</p>);
    }
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

export default ProtocolList;
