import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [themeColor, setThemeColor] = useState('light');

    const handleTheme = () => {
        setThemeColor(themeColor === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ themeColor, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
