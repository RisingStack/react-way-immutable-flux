import {Map} from 'immutable';
import React from 'react/addons';
import Component from './Component';
import Debug from 'debug';

var debug = Debug('myApp');

/*
 * @class Item
 * @extends React.Component
 */
class Item extends Component {

  /*
   * @method shouldComponentUpdate
   * @returns {Boolean}
   */
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    var item = this.props.item;

    debug('render <Item/>', item.get('title'));

    return <li className="item">{item.get('title')} - ${item.get('price')}</li>;
  }
}

// Prop types validation
Item.propTypes = {
  item: React.PropTypes.instanceOf(Map).isRequired
};

export default Item;
