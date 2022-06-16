import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../App';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {
  code: string;
  name: string;
  capital: string | undefined | null;
  emoji: string;
}

const CountryCard = ({code, name, capital, emoji, navigation}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Country', {
          code,
        });
      }}>
      <View style={[styles.container, styles.shadowProp]}>
        <View>
          <Text style={styles.flag}>{emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.header}>{name}</Text>
          <Text style={styles.capital}>{capital}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  flag: {
    fontSize: 60,
  },
  info: {
    marginLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  capital: {
    fontSize: 15,
  },
});

export default CountryCard;
