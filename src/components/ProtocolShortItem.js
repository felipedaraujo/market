import React, { Component } from 'react';
import styled from 'styled-components';

const H4 =styled.h4`
  &.card-title {
    font-size: 1rem;
  }
`;

const P =styled.p`
  &.arrow {
    -webkit-transform: rotate(${(props) => props.isOpen ? '180deg' : '0deg'});
  }

  &.content {
    white-space: pre-line;
  }
`;

class ProtocolShortItem extends Component {
  summary = (text) => {
    return `${text.substring(0, 197)}...`;
  }

  render() {
    const { item } = this.props;

    return (
      <div className="card mb-3 border-0">
        <div className="card-body" >
          <Link to={`/${item.id}`}>
            <H4 className="card-title"><strong>{item.title}</strong></H4>
          </Link>

          <p className="card-text">{this.summary(item.materials_and_methods)}</p>
        </div>
      </div>
    );
  }
}

export default ProtocolShortItem;
