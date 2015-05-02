import {CART} from './const';

var debug = require('debug')('myApp:actions');

/*
 * @class Actions
 */
class Actions {

  /*
   * @constructs Actions
   * @param {Object} dispatcher
   */
  constructor (dispatcher, store) {
    this.dispatcher = dispatcher;
    this.store = store;
  }

  /*
   * @method addCartItem
   * @param {Object} item
   */
  addCartItem (item) {
    debug('CART.ITEM_ADD', item);

    this.dispatcher.dispatch({
      actionType: CART.ITEM_ADD,
      item: item
    });
  }
}

export default Actions;
