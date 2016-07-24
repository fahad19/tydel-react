/* global describe, it */
import { expect } from 'chai';
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Types, createModel, isModel } from 'tydel';

import Provider from '../src/Provider';
import connect from '../src/connect';

describe('connect', function () {
  class Child extends Component {
    static contextTypes = {
      model: PropTypes.object.isRequired
    };

    render() {
      const { name } = this.props;

      return (
        <div className="name">{name}</div>
      );
    }
  }

  const ConnectedChild = connect(function (rootModel) {
    return {
      name: rootModel.name
    };
  })(Child);

  const Model = createModel({
    name: Types.string.isRequired
  }, {
    setName(name) {
      this.name = name;
    }
  });

  it('renders with model values', function () {
    const model = new Model({
      name: 'Test'
    });

    class ProviderContainer extends Component {
      render() {
        return (
          <Provider model={model}>
            <ConnectedChild />
          </Provider>
        )
      }
    }

    const container = TestUtils.renderIntoDocument(<ProviderContainer />);
    const child = TestUtils.findRenderedComponentWithType(container, Child);
    const childNode = ReactDOM.findDOMNode(child);

    // on mount
    expect(child.props).to.eql({ name: 'Test' });
    expect(childNode.textContent).to.eql('Test');

    // on further changes
    model.setName('Test [updated]');
    expect(child.props).to.eql({ name: 'Test [updated]' });
    expect(childNode.textContent).to.eql('Test [updated]');
  });
});
