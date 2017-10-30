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
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  summary = (text) => {
    return `${text.substring(0, 197)}...`;
  }

  collapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  content = (item) => {
    if (this.state.isOpen) {
      return(
        <div>
        <h5 className="card-subtitle text-muted mt-4">Abstract</h5>
        { item.abstract.map((parag, index) => (
          <P className="card-text content" key={index}>{parag}</P>
        )) }

        <h5 className="card-subtitle text-muted mt-4">Materials & Methods</h5>
        { item.materials_and_methods.map((parag, index) => (
          <P className="card-text content" key={index}>{parag}</P>
        )) }
        </div>
      )
    } else {
      return(
        <p className="card-text">{this.summary(item.materials_and_methods[0])}</p>
      )
    }
  }

  render() {
    const { item } = this.props;

    return (
      <div className="card mb-3" onClick={() => this.collapse()}>
        <div className="card-body" >
          <H4 className="card-title"><strong>{item.title}</strong></H4>

          {this.content(item)}

          <P className="text-center mb-0 arrow" isOpen={this.state.isOpen}>&#9662;</P>
        </div>
      </div>
    );
  }
}

export default ProtocolShortItem;
