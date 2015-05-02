import {EventEmitter} from 'events';
import Immutable from 'immutable';
import Debug from 'debug';
import _ from 'lodash';

import {CHANGE, CART} from './const';

var debug = Debug('myApp:store');

/*
 * @class Store
 */
class Store extends EventEmitter {

  /*
   * @constructs Store
   * @extends events.EventEmitter
   * @param {Object} dispatcher
   * @param {Object} [state]
   */
  constructor (dispatcher, state) {
    super();

    var _this = this;

    if (!dispatcher) {
      debug(new Error('Store: dispatcher is required'));
    }

    if (state) {
      debug('app is created with initial state', state);
    }

    state = state || {};
    state = _.merge({}, Store.defaultState, state);

    // Register handlers
    dispatcher.register(function (action) {
      if (action.actionType === CART.ITEM_ADD) {
        _this.onItemAdd(action.item);
        _this.emit(CHANGE);
      }
    });

    debug('store is loaded with state', state);

    // Turn state to immutable
    _this.state = Immutable.fromJS(state);
  }

  /*
   * @method getState
   * @returns {Immutable.Map} - state
   */
  getState () {
    return this.state;
  }

  /*
   * @method onItemAdd
   * @param {Object} item
   */
  onItemAdd (item) {
    debug('item add', item);

    var immutableItem = Immutable.fromJS(item);

    this.state = this.state.updateIn(['cart', 'items'], items => items.push(immutableItem));
  }
}

// Default state
Store.defaultState = {
  cart: {
    title: null,
    items: []
  }
};

export default Store;
