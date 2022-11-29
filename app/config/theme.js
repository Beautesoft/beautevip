import React, { useState, useEffect } from 'react';
import { BaseColor, LightTheme } from './colors';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/reducer/auth/actions';
const themes = {
  DarkTheme: BaseColor,
  LightTheme: LightTheme,
};

export const ThemeContext = React.createContext(themes.DarkTheme);

export const ThemeContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state);
  useEffect(() => {
    console.log('currentTheme------->', currentTheme);
    if (currentTheme) {
      // setTheme(themes[currentTheme]);
      // setActiveTheme(currentTheme);
    } else {
      setTheme(themes['DarkTheme']);
      setActiveTheme('DarkTheme');
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
    setTheme(themes[nextTheme]);
    setActiveTheme(nextTheme);
  };
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
