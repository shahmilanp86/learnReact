import React from 'react';

import firebase from 'firebase/app';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const AuthScreen = () => {
  const [MyData, setMyData] = React.useState<Array<object>>([]);

  const logoutButtonHandler = () => {
    console.log('Loginn Clicked');
    firebase.auth().signOut();
  };

  React.useEffect(() => {
    console.log('Call Fb to get data');

    let db = firebase.firestore();
    let tmpData: Array<object> = [];

    db.collection('clientUsers')
      // .where("amtPendingAfter", ">", 0)
      .orderBy('addedOn', 'desc')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          let obj = doc.data();
          tmpData.push({ email: obj.email, client: obj.client });
          console.log('data fetched: ', obj);
        });
        setMyData(tmpData);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);

  const renderListItem = (item: any) => {
    return <Text>{item}</Text>;
  };
  const Item = ({ title }: { title: any }) => (
    <View style={styles.lineItem}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }: { item: any }) => {
    console.log('milan jere : clinet', item);
    return <Item title={item.client} />;
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>AuthScreen</Text>
          <Button onPress={logoutButtonHandler} title="Sign out" />
        </View>
        <View style={[styles.container, styles.section]}>
          <FlatList data={MyData} renderItem={renderItem}></FlatList>
        </View>
      </View>
    </React.Fragment>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  lineItem: {},
  title: {},
  section: {
    width: '50%', // is 50% of container width
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
});
