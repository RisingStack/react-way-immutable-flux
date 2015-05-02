import React from 'react/addons';

/*
 * @class Component
 * @extends React.Component
 */
class Component extends React.Component {

  /*
   * @constructs Component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /*
   * Apply PureRenderMixin
   *
   * in React 0.13 there is no way to attach mixins to ES6 classes
   * this is a workaround to solve this
   * http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#mixins
   *
   * @method shouldComponentUpdate
   * @returns {Boolean}
   */
  shouldComponentUpdate() {
   return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }
}

// Validate context types
Component.contextTypes = {
  actions: React.PropTypes.object.isRequired
};

export default Component;
