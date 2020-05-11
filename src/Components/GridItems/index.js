import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Modal, Icon } from 'antd-mobile';
import { truncate, concat, orderBy } from 'lodash';

import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

import './style.less';


class GridItems extends React.Component {
  constructor(props) {
    super(props);
    const { foodType } = this.props;
    this.state = {
      isLoading: false,
      items: [],
      error: null,
      modalVisible: false,
      modalItem: null,
    };
    this.apiParams = {
      page: 1,
      per_page: 21,
    };
    if (foodType) {
      this.apiParams.food = foodType;
    }
    this.showModal = this.showModal.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.trackScrolling, true);
    this.loadItems(false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackScrolling, true);
  }

  onClose() {
    this.setState({
      modalVisible: false,
    });
  }

  trackScrolling = (el) => {
    if (el.srcElement.scrollHeight - el.srcElement.scrollTop === el.srcElement.clientHeight) {
      this.apiParams.page += 1;
      this.loadItems(true);
    }
  };

  handleClick = (item) => {
    this.props.addToCart(item);
    this.setState({
      modalVisible: false,
    });
  }

  // load items from api
  loadItems = () => {
    const queryString = Object.keys(this.apiParams).map((key) => `${key}=${this.apiParams[key]}`).join('&');

    fetch(`https://api.punkapi.com/v2/beers?${queryString}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState((previousState) => ({
            ...previousState,
            isLoaded: true,
            items: concat(previousState.items, result),
          }));
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  showModal(e, item) {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      modalItem: item,
    });
  }

  itemsSortBy(sortBy, order) {
    this.setState((previousState) => ({
      ...previousState,
      items: orderBy(previousState.items, [sortBy], [order]),
    }));
  }

  render() {
    const {
      isLoading,
      items,
      error,
      modalVisible,
      modalItem,
    } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <button className="sort-button" type="button" onClick={() => this.itemsSortBy('name', 'asc')}>
          <Icon type="down" size="xxs" />
          <span>Name</span>
        </button>
        <button className="sort-button" type="button" onClick={() => this.itemsSortBy('name', 'desc')}>
          <Icon type="up" size="xxs" />
          <span>Name</span>
        </button>
        <button className="sort-button" type="button" onClick={() => this.itemsSortBy('abv', 'asc')}>
          <Icon type="down" size="xxs" />
          <span>Abv</span>
        </button>
        <button className="sort-button" type="button" onClick={() => this.itemsSortBy('abv', 'desc')}>
          <Icon type="up" size="xxs" />
          <span>Abv</span>
        </button>
        <Grid
          data={items}
          style={{ height: '100%' }}
          columnNum={3}
          square={false}
          renderItem={(dataItem) => (
            <button type="button" onClick={(e) => this.showModal(e, dataItem)}>
              <div style={{ padding: '12.5px' }}>
                <img src={dataItem.image_url} style={{ height: '150px', maxWidth: '100%' }} alt={dataItem.name} />
                <p>{dataItem.name}</p>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                  <span>
                    {truncate(dataItem.description, {
                      length: 50,
                      separator: '...',
                    })}
                  </span>
                </div>
              </div>
            </button>
          )}
        />
        <Modal
          className="item-modal"
          visible={modalVisible}
          transparent
          closable={true}
          maskClosable={true}
          onClose={this.onClose}

        >
          {modalItem ? (
            <>
              <div className="details">
                <h1>{ modalItem.name }</h1>
                <p>{ modalItem.tagline }</p>
                <p>
                  ABV:
                  { modalItem.abv }
                </p>
                <p>
                  { truncate(modalItem.description, {
                    length: 50,
                    separator: '...',
                  })}
                </p>
                <ul>
                  {modalItem.food_pairing.slice(0, 3).map((item) => (
                    <li>{item}</li>
                  ))}
                  { modalItem.food_pairing.length > 3 ? (
                    <li>...</li>
                  ) : ''}
                </ul>
              </div>
              <div className="image">
                <img style={{ width: '40%' }} src={modalItem.image_url} alt={modalItem.name} />
              </div>

              <div className="add-to-cart">
                <button type="button" onClick={() => { this.handleClick(modalItem); }}>Add to Cart</button>
              </div>
            </>
          ) : ''}
        </Modal>
      </div>
    );
  }
}

GridItems.defaultProps = {
  foodType: null,
};

GridItems.propTypes = {
  foodType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => {
    dispatch(addToCart(item));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GridItems);
