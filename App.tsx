import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Continent from './src/Continent';
import Country from './src/Country';
import HomeScreen from './src/HomeScreen';

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

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Country" component={Country} />
          <Stack.Screen name="Continent" component={Continent} />
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
