import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import FloatingBtn from './components/FloatingBtn';
import {useGetCountryQuery} from './generated/graphql';
import {useTheme} from './theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Country'>;

const Country = ({route, navigation}: Props) => {
  const {loading, error, data} = useGetCountryQuery({
    variables: {
      code: route.params.code,
    },
  });

  const {isDark, colors} = useTheme();

  const textStyle = {
    color: colors.text,
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.head}>
        <Text style={styles.flag}>{data?.country?.emoji}</Text>
        <Text style={[styles.countryName, textStyle]}>
          {data?.country?.name}
        </Text>
      </View>
      <View style={[styles.info]}>
        <Text style={textStyle}>alpha2Code</Text>
        <Text style={textStyle}>{data?.country?.code}</Text>
      </View>
      <View style={styles.info}>
        <Text style={textStyle}>callingCodes</Text>
        <Text style={textStyle}>{data?.country?.phone}</Text>
      </View>
      <View
        style={[
          styles.info,
          {
            flex: 1,
          },
        ]}>
        <Text style={textStyle}>continent</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Continent', {
              code: data!.country!.continent.code,
            });
          }}>
          <Text style={styles.continent}>{data?.country?.continent.name}</Text>
        </TouchableOpacity>
      </View>
      <FloatingBtn />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
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
