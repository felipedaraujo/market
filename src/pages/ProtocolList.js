import React, { Component } from 'react';
import styled from 'styled-components';
import Infinite from 'react-infinite';
import { Link } from 'react-router-dom';


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

  onInfiniteLoad = () => {
    if (this.props.hasMoreItems) this.props.onLoadMore();
  }

  rowRenderer = (item, key) => {
    return (
      <Link to={`/${item.id}`} className="card mb-3 border-0 text-dark" key={key}
              onClick={() => this.props.onItemSelect(item)}>
        <div className="card-body">
          <H4 className="card-title">
            {this.title(item)}
          </H4>
          {this.methods(item)}
        </div>
      </Link>
    )
  }

  spinner = () => {
    if (this.props.loading) return (<div className="text-center">Loading...</div>);
  }

  renderList = () => {
    const { items, loading } = this.props;

    if (items.length) {
      return (
        <Infinite elementHeight={159}
          useWindowAsScrollContainer
          infiniteLoadBeginEdgeOffset={100}
          onInfiniteLoad={this.onInfiniteLoad}
          loadingSpinnerDelegate={this.spinner()}
          isInfiniteLoading={loading}
        >
          {items.map(this.rowRenderer)}
        </Infinite>
      );
    } else if (!this.props.loading) {
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

        {this.renderList()}
      </div>
    );
  }
}

export default ProtocolList;
