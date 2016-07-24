import { Component, PropTypes, Children } from 'react';

export default class Provider extends Component {
  static propTyoes = {
    model: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    model: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      model: this.model
    };
  }

  constructor(props, context) {
    super(props, context);

    this.model = props.model;
  }

  render() {
    return Children.only(this.props.children);
  }
}
