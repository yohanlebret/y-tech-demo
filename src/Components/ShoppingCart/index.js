import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'antd-mobile';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';

import { removeItem, addQuantity, subtractQuantity } from '../actions/cartActions';

import './style.less';


class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartVisible: false,
    };
  }

  // show the cart if the state have been updated
  // example: show the cart when item is added to the cart
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.cartVisible) {
      this.setState({
        cartVisible: true,
      });
    }
  }

  showCart = () => {
    this.setState({
      cartVisible: true,
    });
  }

  hideCart = () => {
    this.setState({
      cartVisible: false,
    });
  }

  handleRemove = (id) => {
    this.props.removeItem(id);
  }

  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  }

  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  }

  render() {
    const { items, total } = this.props;
    const { cartVisible } = this.state;

    // list all item from the store
    const addedItems = items.length ? (
      items.map((item) => {
        return (
          <li key={item.id}>
            <div className="image">
              <img src={item.image_url} alt={item.name} />
            </div>
            <div className="details">
                {item.name}
            </div>
            <div className="quantity-actions">
              <button type="button" onClick={() => { this.handleSubtractQuantity(item.id); }}>-</button>
              <span className="quantity">{item.quantity}</span>
              <button type="button" onClick={() => { this.handleAddQuantity(item.id); }}>+</button>                
            </div>
            <div className="remove">
              <button type="button" onClick={() => { this.handleRemove(item.id); }}><DeleteOutlined /></button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );

    return (
      <>
        <button
          className="show-cart-title show-cart-button"
          type="button"
          onClick={() => { this.showCart(); }}
        >
          <ShoppingCartOutlined className="show-cart-button-icon" />
          Shopping cart
        </button>
        <Modal
          popup
          className="shopping-cart-modal"
          visible={cartVisible}
          onClose={() => { this.hideCart(); }}
          animationType="slide-up"
        >
          <div>
            <div className="show-cart-title">
              <ShoppingCartOutlined className="show-cart-button-icon" />
              Shopping cart
            </div>
            {items.length ? (
              <>
                <div>
                  <ul className="items">
                    {addedItems}
                  </ul>
                </div>
                <div className="actions">
                  <p>
                    <b>Total: £</b>
                    {total}
                  </p>
                  <p>
                    <button type="button">Confirm Payment</button>
                  </p>
                </div>
              </>
            ) : (
              <p>Shopping is empty</p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.addedItems,
  total: state.total,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => { dispatch(removeItem(id)); },
  addQuantity: (id) => { dispatch(addQuantity(id)); },
  subtractQuantity: (id) => { dispatch(subtractQuantity(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
