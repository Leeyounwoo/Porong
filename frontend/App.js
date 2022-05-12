import React from 'react';
import { PermissionsAndroid } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import rootReducer from './reducer/index';
import Geolocation from 'react-native-geolocation-service';
import { positionContain } from './reducer/index';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './screens/Login';
import Signin from './screens/Signin';
import PhoneForm from './screens/PhoneForm';
const store = createStore(rootReducer);
const init = createStackNavigator();
const Stack = createStackNavigator();
async function requestCameraPermission() {
  //Calling the permission function
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'AndoridPermissionExample App Camera Permission',
      message: 'AndoridPermissionExample App needs access to your camera ',
    }
  );
}
requestCameraPermission();
Geolocation.watchPosition(
  position => {
    store.dispatch(positionContain(position.coords.latitude, position.coords.longitude));
  },
  error => {
    // See error code charts below.
    console.log(error.code, error.message);
  },
  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
);

// messaging().onMessage(async remoteMessage => {
//   // Get the message body
//   let message_body = remoteMessage.notification.body;

//   // Get the message title
//   let message_title = remoteMessage.notification.title;

//   // Get message image
//   let avatar = remoteMessage.notification.android.imageUrl;

//   // Show an alert to the user
//   Alert.alert(message_title, message_body);
// });

const loginProcess = () => {
  return (
    <init.Navigator initialRouteName='login'>
      <init.Screen name="login" component={Login} />
      <init.Screen name="signin" component={Signin} />
      <init.Screen name="phone" component={PhoneForm} />
    </init.Navigator>
  )
}
const Stacks = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  AsyncStorage.getItem('user')
    .then(info => {
      if (info !== null) {
        setIsLogin(true);
      }
    })
    .catch(err => {
      console.log("err", err)
    });

  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'home' : 'login'}
      screenOptions={{ headerShown: false}}>
      <Stack.Screen name="home" component={Tabs} />
      <Stack.Screen name="login" component={loginProcess} />
    </Stack.Navigator>
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
