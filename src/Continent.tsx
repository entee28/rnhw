import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import FloatingBtn from './components/FloatingBtn';
import {useGetContinentQuery} from './generated/graphql';
import {useTheme} from './theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Continent'>;

const Continent = ({navigation, route}: Props) => {
  const {loading, error, data} = useGetContinentQuery({
    variables: {
      code: route.params.code,
    },
  });

  const {colors, isDark} = useTheme();

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
      <View
        style={{
          marginTop: 120,
        }}>
        <FloatingBtn />
      </View>
      <Text style={[styles.title, textStyle]}>{data?.continent?.name}</Text>
      <View style={styles.info}>
        <Text style={textStyle}>alpha2Code</Text>
        <Text style={textStyle}>{data?.continent?.code}</Text>
      </View>
      <View style={styles.info}>
        <Text style={textStyle}>countries</Text>
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
            marginBottom: 400,
          }}
        />
      </View>
      <FloatingBtn />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: -30,
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
