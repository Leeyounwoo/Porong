import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { root } from './reducer';

const store = createStore(root);

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
    </Provider>
  );
};

export default App;
