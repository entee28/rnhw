import {View, Text, useColorScheme, StatusBar, FlatList} from 'react-native';
import React from 'react';
import {useGetCountriesQuery} from './generated/graphql';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryCard from './components/CountryCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation, route}: Props) => {
  const {loading, error, data} = useGetCountriesQuery();

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data?.countries}
        renderItem={({item}) => (
          <CountryCard
            code={item.code}
            name={item.name}
            capital={item.capital}
            emoji={item.emoji}
            navigation={navigation}
            route={route}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
