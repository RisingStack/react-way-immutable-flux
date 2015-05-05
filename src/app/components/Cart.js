import {Map} from 'immutable';
import React from 'react/addons';
import Debug from 'debug';
import Component from './Component';
import Item from './Item';

var debug = Debug('myApp');

/*
 * @class Cart
 * @extends React.Component
 */
class Cart extends Component {

  /*
   * @method shouldComponentUpdate
   * @returns {Boolean}
   */
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  /*
   * @method onItemAddClick
   */
  onItemAddClick () {
    var title = 'Item ' + Math.random().toString(36).substring(14);
    var price = Math.floor((Math.random() * 100) + 1);

    this.context.actions.addCartItem({
      title: title,
      price: price
    });
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    var cart = this.props.cart;

    debug('render <Cart/>');

    return <div className="cart">
      <h2>{cart.get('title')}</h2>
      <p>Press the button and check you console. AppRoot and Cart will be re-rendered but only with the new item.</p>
      <button onClick={this.onItemAddClick.bind(this)}>Add item</button>
      <ul>
        {cart.get('items').map(function (item, key) {
          return <Item key={key} item={item} />;
        })}
      </ul>
    </div>;
  }
}

// Prop types validation
Cart.propTypes = {
  cart: React.PropTypes.instanceOf(Map).isRequired
};

export default Cart;
