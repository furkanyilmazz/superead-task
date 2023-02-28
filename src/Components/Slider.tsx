import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  id: string;
  name: string;
  onPress: () => void;
};

const Slider = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.slider}
      onPress={() => {
        props.onPress();
      }}>
      <Text style={styles.title}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default Slider;

const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#141414',
    flexDirection: 'column',
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: '#FFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
