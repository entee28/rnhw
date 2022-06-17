import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/useTheme';

const FloatingBtn = () => {
  const {isDark, setScheme, colors} = useTheme();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          isDark ? setScheme('light') : setScheme('dark');
        }}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
          zIndex: 10,
        }}>
        <Text style={{fontSize: 28}}>🖌️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingBtn;
