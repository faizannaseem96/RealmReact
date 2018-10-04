import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './Home';

export default class App extends Component {

  render() {
    return (
      <Navigator />
    );
  }
}

const Navigator = createStackNavigator({
    Home: {
        screen: Home
    }
})
