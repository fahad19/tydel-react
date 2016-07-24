/* global describe, it */
import { expect } from 'chai';
import React, { PropTypes, Component } from 'react';
import TestUtils from 'react-addons-test-utils';
import { Types, createModel, isModel } from 'tydel';

import Provider from '../src/Provider';

describe('Provider', function () {
  class Child extends Component {
    static contextTypes = {
      model: PropTypes.object.isRequired
    };

    render() {
      return <div />;
    }
  }

  const Model = createModel({
    name: Types.string.isRequired
  });

  const model = new Model({
    name: 'Test'
  });

  it('should add `model` to child context', function () {
    class ProviderContainer extends Component {
      render() {
        return (
          <Provider model={model}>
            <Child />
          </Provider>
        )
      }
    }

    const container = TestUtils.renderIntoDocument(<ProviderContainer />);
    const child = TestUtils.findRenderedComponentWithType(container, Child);

    expect(isModel(child.context.model)).to.eql(true);
    expect(child.context.model).to.eql(model);
    expect(child.context.model.name).to.eql('Test');
  });

  it.skip('should allow only one element as child', function () {

  });
});
