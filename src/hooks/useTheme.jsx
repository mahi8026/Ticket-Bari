import React from "react";
import { useState, useEffect } from 'react';

const useTheme = () => {
    
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        const html = document.documentElement;

        html.classList.remove('light', 'dark'); 
        html.removeAttribute('data-theme');

        if (theme === 'dark' || theme === 'light') {
            html.setAttribute('data-theme', theme);
        } else {
            html.classList.add(theme); 
        }

        localStorage.setItem('theme', theme);
    }, [theme]); 

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useTheme;