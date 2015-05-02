import React from 'react/addons';
import Debug from 'debug';
import Flux from 'flux';

import Actions from './actions';
import Store from './store';

import AppRoot from './components/AppRoot';
import {CHANGE} from './const';

var debug = Debug('myApp');

/*
 * @class App
 */
class App {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor(options) {
    var _this = this;

    debug('create app with options', options);

    var dispatcher = new Flux.Dispatcher();

    _this.store = new Store(dispatcher, options.state);
    _this.actions = new Actions(dispatcher, _this.store);
    _this.element = null;

    _this.store.on(CHANGE, function () {
      _this.render();
    });
  }

  /*
   * @method render
   * @param {DOM} [element]
   * @returns {String|undefined}
   */
   render (element) {
    var state = this.store.getState();

    this.element = element || this.element;

    // would be in JSX: <AppRoot state={this.state} />
    var appRootElement = React.createElement(AppRoot, {
      actions: this.actions,
      state: state
    });

    // render to DOM
    if (this.element) {
      debug('render to DOM with state', state.toJS());
      React.render(appRootElement, this.element);
      return;
    }

    // render to string
    debug('render to string with state', state.toJS());
    return React.renderToString(appRootElement);
  }

  /*
   * @method render
   * @param {DOM} element
   */
   renderToDOM (element) {
    if(!element) {
      return debug(new Error('App.renderToDOM: element is required'));
    }

    this.render(element);
   }

  /*
   * @method renderToString
   * @returns {String}
   */
   renderToString () {
    return this.render();
  }

  /*
   * @method getState
   * @returns {Immutable.map}
   */
   getState () {
    return this.store.state;
  }
}

export default App;
