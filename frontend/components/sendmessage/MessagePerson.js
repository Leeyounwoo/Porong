import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Button,
} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from 'react-redux';
import {personContain} from '../../reducer';


export default function MessagePerson({navigation}) {
  const [contacts, setContacts] = useState(null);

  const store = useStore();
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      }).then(() => {
        getList();
      });
    } else if (Platform.OS === 'ios') {
        getList();
    }
  }, [])
  
  const getList = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
        console.log(contacts);
      })
      .catch(e => {
        console.log('cannot access');
      });
  }

  const next = () => {
    AsyncStorage.getItem('user').then(res => { console.log(JSON.parse(res)); }).catch(err => { console.log(err)});
    store.dispatch(personContain(21,11));
    navigation.navigate('Time');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.contactName}>
        Name: {`${item.givenName} `} {item.familyName}
      </Text>
      {item.phoneNumbers.map(phone => (
        <Text style={styles.phones}>
          {phone.label} : {phone.number}
        </Text>
      ))}
    </View>
  );
  
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
      <View>
        <Button title="다음" onPress={next}><Text>다음</Text></Button>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
  },
  contactName: {
    fontSize: 16,
    color: 'blue',
  },
});



// class ContactList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contacts: null,
//     };
//   }

//   componentDidMount() {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//         title: 'Contacts',
//         message: ' This app would like to see your contacts',
//       }).then(() => {
//         this.getList();
//       });
//     } else if (Platform.OS === 'ios') {
//       this.getList();
//     }
//   }

//   getList = () => {
//     Contacts.getAll()
//       .then(contacts => {
//         this.setState({contacts});
//         console.log(contacts);
//       })
//       .catch(e => {
//         console.log('cannot access');
//       });
//   };

//   renderItem = ({item}) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.contactName}>
//         Name: {`${item.givenName} `} {item.familyName}
//       </Text>
//       {item.phoneNumbers.map(phone => (
//         <Text style={styles.phones}>
//           {phone.label} : {phone.number}
//         </Text>
//       ))}
//     </View>
//   );
//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.state.contacts}
//           renderItem={this.renderItem}
//           numColumns={1}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   }
// }
