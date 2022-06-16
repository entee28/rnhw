import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {useGetContinentQuery} from './generated/graphql';

type Props = NativeStackScreenProps<RootStackParamList, 'Continent'>;

const Continent = ({navigation, route}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {loading, error, data} = useGetContinentQuery({
    variables: {
      code: route.params.code,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>{data?.continent?.name}</Text>
      <View style={styles.info}>
        <Text>alpha2Code</Text>
        <Text>{data?.continent?.code}</Text>
      </View>
      <View style={styles.info}>
        <Text>countries</Text>
        <FlatList
          data={data?.continent?.countries}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Country', {
                  code: item.code,
                });
              }}>
              <Text style={styles.country}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{
            marginLeft: 100,
            marginBottom: 200,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  country: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Continent;
