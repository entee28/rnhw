import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {useGetCountryQuery} from './generated/graphql';

type Props = NativeStackScreenProps<RootStackParamList, 'Country'>;

const Country = ({route, navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {loading, error, data} = useGetCountryQuery({
    variables: {
      code: route.params.code,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.head}>
        <Text style={styles.flag}>{data?.country?.emoji}</Text>
        <Text style={styles.countryName}>{data?.country?.name}</Text>
      </View>
      <View style={styles.info}>
        <Text>alpha2Code</Text>
        <Text>{data?.country?.code}</Text>
      </View>
      <View style={styles.info}>
        <Text>callingCodes</Text>
        <Text>{data?.country?.phone}</Text>
      </View>
      <View style={styles.info}>
        <Text>continent</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Continent', {
              code: data!.country!.continent.code,
            });
          }}>
          <Text style={styles.continent}>{data?.country?.continent.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  flag: {
    fontSize: 70,
  },
  countryName: {
    fontSize: 30,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continent: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Country;
