import React, { PropTypes } from 'react';

export default function connect(mapModelToProps) {
  return function (ContainerComponent) {
    const WrappedComponent = React.createClass({
      getInitialState() {
        return {
          containerProps: {}
        };
      },

      componentWillMount() {
        this.modelWatcher = this.context.model.on('change', () => {
          this.setState({
            containerProps: mapModelToProps(this.context.model)
          });
        });
      },

      componentWillUnmount() {
        this.modelWatcher();
      },

      render() {
        const { containerProps } = this.state;

        return <ContainerComponent {...containerProps} />;
      }
    });

    WrappedComponent.contextTypes = {
      model: PropTypes.object.isRequired
    };

    return WrappedComponent;
  };
}
