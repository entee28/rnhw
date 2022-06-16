import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
      <View style={styles.container}>
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
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
