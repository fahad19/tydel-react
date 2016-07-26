import React, { PropTypes } from 'react';

export default function connect(mapModelToProps) {
  return function (ContainerComponent) {
    const displayName = ContainerComponent.displayName || ContainerComponent.name || 'Component';

    const WrappedComponent = React.createClass({
      displayName: `Connect(${displayName})`,

      getInitialState() {
        return {
          containerProps: {}
        };
      },

      updateStateFromModel() {
        this.setState({
          containerProps: mapModelToProps(this.context.model)
        });
      },

      componentWillMount() {
        this.updateStateFromModel();
      },

      componentDidMount() {
        this.modelWatcher = this.context.model.on('change', () => {
          this.updateStateFromModel();
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
