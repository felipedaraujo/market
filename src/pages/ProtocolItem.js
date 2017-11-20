import React, { Component } from 'react';
import styled from 'styled-components';

const H4 =styled.h4`
  &.card-title {
    font-size: 1rem;
  }
`;

const P =styled.p`
  &.content {
    white-space: pre-line;
  }
`;

class ProtocolItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card mb-3 border-0">
        <div className="card-body" >

          <H4 className="card-title"><strong>{item.title}</strong></H4>

          <h5 className="card-subtitle text-muted mt-4">Abstract</h5>
          <P className="card-text content">{item.abstract}</P>

          <h5 className="card-subtitle text-muted mt-4">Materials & Methods</h5>
          <P className="card-text content">{item.materials_and_methods}</P>
        </div>
      </div>
    );
  }
}

export default ProtocolItem;
