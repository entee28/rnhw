import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import CountryCard from './components/CountryCard';
import FloatingBtn from './components/FloatingBtn';
import {useGetCountriesQuery} from './generated/graphql';
import {useTheme} from './theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation, route}: Props) => {
  const {loading, error, data} = useGetCountriesQuery();

  const {isDark, colors} = useTheme();

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        backgroundColor: colors.background,
      }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
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
            colors={colors}
          />
        )}
      />
      <FloatingBtn />
    </SafeAreaView>
  );
};

export default HomeScreen;
