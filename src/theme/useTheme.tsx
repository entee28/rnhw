import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, ITheme, lightColors} from './themes';

interface ICustomThemeContext {
  isDark: boolean;
  setScheme: (scheme: 'dark' | 'light') => void;
  colors: ITheme;
}

export const CustomThemeContext = createContext<ICustomThemeContext>({
  isDark: false,
  setScheme: (scheme: 'dark' | 'light') => {},
  colors: lightColors,
});

interface Props {
  children: React.ReactNode;
}

export const CustomThemeProvider = ({children}: Props) => {
  const colorScheme = useColorScheme();

  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: 'light' | 'dark') => {
      setIsDark(scheme === 'dark');
    },
  };

  return (
    <CustomThemeContext.Provider value={defaultTheme}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useTheme = () => useContext(CustomThemeContext);
