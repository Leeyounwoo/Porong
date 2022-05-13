/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Messagedetail from './components/Messagedetail';

import {name as appName} from './app.json';
import ReceivedBox from './screens/ReceivedBox';
import AnimationTest from './AnimationTest';
AppRegistry.registerComponent(appName, () => Messagedetail);
