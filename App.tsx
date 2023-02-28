import React from 'react';
import Home from './src/Screens/Home';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Warning: ...']);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
