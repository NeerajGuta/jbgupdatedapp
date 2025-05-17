import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

function SlapScreen({navigation}) {
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setTimeout(() => {
      if (user) {
        navigation.navigate('Home1');
      } else {
        navigation.navigate('SignIn');
      }
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* <Video
        source={require('../../assets/images/splash.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat
      /> */}
    </View>
  );
}

export default SlapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
