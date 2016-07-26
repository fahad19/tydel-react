# tydel-react
<!--{h1:.massive-header.-with-tagline}-->

> React bindings for Tydel

[![Build Status](https://img.shields.io/travis/fahad19/tydel-react/master.svg)](http://travis-ci.org/fahad19/tydel-react) [![npm](https://img.shields.io/npm/v/tydel-react.svg)](https://www.npmjs.com/package/tydel-react)

Allows you to use [Tydel](https://github.com/fahad19/tydel) for managing your state in [React.js](https://github.com/facebook/react) applications.

## Installation

### npm

With [npm](https://npmjs.com):

```
$ npm install --save tydel-react
```

### Bower

With [Bower](https://bower.io):

```
$ bower install --save tydel-react
```

In your HTML file:

```js
<!DOCTYPE html>
<html>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react-dom.min.js"></script>

    <script src="bower_components/tydel/dist/tydel.min.js"></script>
    <script src="bower_components/tydel-react/dist/tydel-react.min.js"></script>
  </body>
</html>
```

## Usage

Import the modules first:

```js
// React
import { PropTypes, Component } from 'react';
import { render } from 'react-dom';

// Tydel
import { Types, createModel } from 'tydel';
import { Provider, connect } from 'tydel-react';
```

Let's define and instantiate a Model which will act as our state for the React application:

```js
// Model class
const AppState = createModel({
  name: Types.string,
}, {
  setName(name) {
    this.name = name;
  }
});

// instance
const appState = new AppState({
  name: 'My new app'
});
```

Now that we have the `appState` model instance, let's create our root Component:

```js
class AppComponent extends Component {
  render() {
    const { name, setName } = this.props;

    <div>
      <p>
        App name is: {name}
      </p>

      {/* Clicking here would update the name, and re-render the Component */}
      <a onClick={() => setName('foo')}>
        Click to set app name to `foo`
      </a>
    </div>
  }
}
```

To inject `name` and `setName` as props to the Component, we need to decorate it with `connect` function:

```js
// `AppComponent` variable is now `App` after connecting
const App = connect(function mapModelToProps(model) {
  // `model` is `appState`
  return {
    name: model.name,
    setName: model.setName
  };

  // or we could just `return model;` here
})(AppComponent);
```

Now it's time to render it to DOM. Here we are gonna use the `<Provider>` component and pass our `appState` as the model, so that all child Components, when using `connect()`, would be able to access the state:

```js
render(
  <Provider model={appState}>
    <App />
  </Provider>,
  document.getElementById('root') // mounts the app in <div id="root"></div>
);
```

And you have a working React application with Tydel!

## API

### `<Provider model>`

The root component of your application needs to be wrapped with `<Provider>` in order to pass the model around via React's context API.

To be imported as:

```js
import { Provider } from 'tydel-react';
```

Accepts only one prop called `model`. Pass your model instance there.

```js
import React from 'react';
import { render } from 'react-dom';

const rootElement = document.getElementById('root');

const model = new Model({...}); // your own Model class created by Tydel
const App = React.createComponent({...}); // your root Component

render(
  <Provider model={model}>
    <App />
  </Provider>
);
```

### `connect(mapModelToProps)`

This function accepts a function `mapModelToProps`, which then accepts the model instance we initially passed via `<Provider model={model}>`, and returns an object which is then injected as props in your custom Component.

Imagine your `mapModelToProps` function as this:

```js
function mapModelToProps(model) {
  return {
    name: model.name,
    setName: model.setName
  };
}
```

Now if you had your root component in a variable called `AppComponent`, we could connect it as:

```js
// React component
const AppComponent = React.createClass({...});

// connected component
const App = connect(mapModelToProps)(AppComponent);
```

Now, when the `App` component gets rendered somewhere, it would have access to `name` and `setName` in its props as `this.props.name` for example.

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
