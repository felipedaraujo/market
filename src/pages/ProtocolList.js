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

  highlight = (item, attr) => {
    const { highlights } = item;
    return highlights && highlights[attr] ? highlights[attr] : item[attr];
  }

  title = (item) => {
    const attr = 'title';
    const text = this.highlight(item, attr);
    const hasInnerHtml = item.highlights && item.highlights[attr];

    if (hasInnerHtml) {
      const markup = this.createMarkup(this.summary(text, 77));

      return (
        <strong dangerouslySetInnerHTML={markup}>
        </strong>
      );
    } else {
      return (
        <strong>
          {this.summary(text, 77)}
        </strong>
      );
    }
  }

  methods = (item) => {
    const attr = 'materials_and_methods';
    const text = this.highlight(item, attr);
    const hasInnerHtml = item.highlights && item.highlights[attr];

    if (hasInnerHtml) {
      const markup = this.createMarkup(this.summary(text, 197))
      return (
        <p className="card-text" dangerouslySetInnerHTML={markup}>
        </p>
      );
    } else {
      return (
        <p className="card-text">
          {this.summary(text, 197)}
        </p>
      );
    }
  }

  createMarkup = (text) => {
    return {__html: text};
  }

  renderList = () => {
    const { items } = this.props;

    if (items.length) {
      return items.map((item, index) => {
        return (
          <div className="card mb-3 border-0" key={index} onClick={() => this.props.onItemSelect(item)}>
            <div className="card-body" >
              <H4 className="card-title">
                {this.title(item)}
              </H4>
              {this.methods(item)}
            </div>
          </div>
        );
      });
    } else {
      // TODO: render this message outside of the InfiniteScroll block
      return (<p>Your search - <strong>{this.props.query}</strong> - did not match any documents.</p>);
    }
  }

  resultsTotal = () => {
    const { query, items } = this.props;

    if (query && items.length) {
      return (
        <p>
          About ({items.length}) results for <strong>{query}</strong>
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.resultsTotal()}
        <Infinite containerHeight={1600} elementHeight={159} onInfiniteLoad={this.handleInfiniteLoad}>
          {this.renderList()}
        </Infinite>
      </div>
    );
  }
}

export default ProtocolList;
