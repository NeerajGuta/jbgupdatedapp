import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

function SpasssSc({navigation}) {
  const getUser = async () => {
    setTimeout(()=>{
    navigation.navigate('SlapScreen2');
    },2000)

  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []), // Empty dependency array ensures it only runs when the screen gains focus
  );

  return (
    <>
      <View style={styles.container}>
        <Animatable.View animation="zoomInUp" style={styles.img}>
          <Image
            source={require('../../assets/images/Buygold.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
        </Animatable.View>
      </View>
    </>
  );
}

export default SpasssSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  img: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 290,
    height: 150,
  },
});
