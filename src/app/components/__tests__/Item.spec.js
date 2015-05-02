jest.dontMock('../Item');

import React from 'react/addons';
import Immutable from 'immutable';
import Item from '../Item';

var TestUtils = React.addons.TestUtils;
var itemProp = Immutable.fromJS({
  title: 'Item 1',
  price: 12
});

describe('Item', () => {

  it('renders properly', () => {
    var item = TestUtils.renderIntoDocument(
      <Item item={itemProp} />
    );

    var li = TestUtils.findRenderedDOMComponentWithTag(item, 'li');

    expect(li.getDOMNode().textContent).toEqual('Item 1 - $12');
  });
});
