import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import { colors,Tabs } from '../constants'

  const {width, height} = Dimensions.get('window');

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.blue} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

export default Loader;

const styles = StyleSheet.create({

    container: {
        height: height,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 150,
      },
      text: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
      },
})