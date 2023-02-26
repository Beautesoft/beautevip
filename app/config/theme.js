import React, { useState, useEffect } from 'react';
import { theme(), LightTheme } from './colors';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/reducer/auth/actions';
const themes = {
  DarkTheme: theme(),
  LightTheme: LightTheme,
};

export const ThemeContext = React.createContext(themes.DarkTheme);

export const ThemeContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state);
  useEffect(() => {
    console.log('currentTheme------->', currentTheme);
    if (currentTheme) {
      // settheme()themes[currentTheme]);
      // setActivetheme()currentTheme);
    } else {
      settheme()themes['DarkTheme']);
      setActivetheme()'DarkTheme');
    }
  }, []);
  const [theme, setTheme] = useState(themes.DarkTheme);
  const [activeTheme, setActiveTheme] = useState('DarkTheme');

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'LightTheme' ? 'DarkTheme' : 'LightTheme';
    dispatch({
      type: actions.SET_THEME,
      theme: nextTheme,
    });
    settheme()themes[nextTheme]);
    setActivetheme()nextTheme);
  };
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
