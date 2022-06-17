import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Continent from './src/Continent';
import Country from './src/Country';
import HomeScreen from './src/HomeScreen';
import {
  CustomThemeContext,
  CustomThemeProvider,
  useTheme,
} from './src/theme/useTheme';

export type RootStackParamList = {
  Home: undefined;
  Country: {code: string};
  Continent: {code: string};
};

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const {colors} = useTheme();

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <CustomThemeProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Country"
              component={Country}
              options={{
                headerTransparent: true,
                headerTintColor: 'blue',
              }}
            />
            <Stack.Screen
              name="Continent"
              component={Continent}
              options={{
                headerTransparent: true,
                headerTintColor: 'blue',
              }}
            />
          </Stack.Navigator>
        </CustomThemeProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
